"use client";

//******************************************
// PROBLEME RELOAD PAGE A REGLER
//******************************************

import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, TrackballControls, OrbitControls } from '@react-three/drei';


const tags = [
    "Wood", "Upcycling", "elparo", "Metal", "Origami",
    "Rorschach", "elparo", "Land Art", "Model", "elparo", "Featuring", "Ceramic",
    "elparo","Wood2", "elparo", "Upcycling2", "Metal2", "elparo", "Origami2",
    "Rorschach2", "Land Art2", "elparo", "Model2", "Featuring2", "Ceramic2",
    "Wood3", "elparo", "Upcycling3", "Metal3", "Origami3",
    "Rorschach3", "elparo", "Land Art3", "Model3", "elparo", "Featuring3"
]; //array avec les catégories à rentrer


function Word({ children, ...props }) {
    const color = new THREE.Color(); //création d'un "matériel"
    const fontProps = { font: 'Rakkas-Regular.ttf', fontSize: 2.7, letterSpacing: 0, lineHeight: 1, 'material-toneMapped': false } //création des mots
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false) //Besoin pour la gestion du hover

    const handleClick = (e) => {
        // console.log(e.object.name);
        location.assign(`http://localhost:3000/${e.object.name}`);
    }

    // Change le curseur de la souris
    useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer'
        return () => (document.body.style.cursor = 'auto')
    }, [hovered])
    //Set la couleur des mots avec la notion de hover ou non
    useFrame(({ camera }) => {
        ref.current.material.color.lerp(color.set(hovered ? '#ca3b23' : '#222'), 0.1)
    })
    //return un billboard (groupe face caméra)
    return (
        <Billboard {...props}>
            {/*Mise en place de name pour event onClick*/}
            <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={handleClick} {...fontProps} children={children} name={children} />
        </Billboard>
    )
}

function Cloud({ count, radius}) {
    // Count permet d'insérer un nombre de mots (le carré de count) et le radius permet de changer la taille de la sphère
    const words = useMemo(() => {
        const temp = [] //Array contenant les points sur la sphère
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count+1)
        const thetaSpan = (Math.PI * 2) / count //Mathematik

        let wordKey = 0;
        for (let i = 1; i < count + 1; i++){
            for (let j = 0; j < count; j++){
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), tags[wordKey]]);
                wordKey++;
            }
        } //loop pour push les différents points avec la catégorie associée
        return temp
    }, [count, radius]) //Temp est retourné dans words (mis en cache)

    return words.map(([pos, word], index) => <Word key={index} position={pos} children={word}/>) //render avec le tableau de catégories à l'intérieur du billboard
}

export default function TagCloud(){
    const myCamera = new THREE.PerspectiveCamera(100, 1, 1, 1000);

    return (
        <Canvas className="tagCloud" dpr={[1, 2]} camera={{position: [0,0,45], fov: 100}}>
            {/*Profondeur*/}
            <fog attach="fog" args={['#fff', 10, 75]} />
            {/*Suspense mis à null pour que le cloud charge directement à l'arrivée du composant*/}
            <Suspense fallback={null}>
                <group rotation={[10, 10.5, 10]}>
                    <Cloud count={5} radius={25}/>
                </group>
            </Suspense>
            {/*Controls inherit de THREE.js*/}
            <TrackballControls noZoom={true}/>
        </Canvas>
    )
}
