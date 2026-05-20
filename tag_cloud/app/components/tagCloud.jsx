"use client";

import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, Text, TrackballControls } from '@react-three/drei';
import { generate } from 'random-words';

function Word({ children, ...props }) {
    const color = new THREE.Color()
    const fontProps = { font: 'Rakkas-Regular.ttf', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)
    // Change the mouse cursor on hover¨
    useEffect(() => {
        if (hovered) document.body.style.cursor = 'pointer'
        return () => (document.body.style.cursor = 'auto')
    }, [hovered])
    // Tie component to the render-loop
    useFrame(({ camera }) => {
        ref.current.material.color.lerp(color.set(hovered ? '#ca3b23' : '#222'), 0.1)
    })
    return (
        <Billboard {...props}>
            <Text ref={ref} onPointerOver={over} onPointerOut={out} onClick={() => console.log("j'ai cliqué")} {...fontProps} children={children} />
        </Billboard>
    )
}

function Cloud({ count = 4, radius = 26 }) {
    // Create a count x count random words with spherical distribution
    const words = useMemo(() => {
        const temp = []
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count + 1)
        const thetaSpan = (Math.PI * 2) / count

        const tags = [
            "Wood", "Upcycling", "elparo", "Metal", "Origami",
            "Rorschach", "elparo", "Land Art", "Model", "elparo", "Featuring", "Ceramic",
            "elparo","Wood2", "elparo", "Upcycling2", "Metal2", "elparo", "Origami2",
            "Rorschach2", "Land Art2", "elparo", "Model2", "Featuring2", "Ceramic2",
            "Wood3", "elparo", "Upcycling3", "Metal3", "Origami3",
            "Rorschach3", "elparo", "Land Art3", "Model3", "elparo", "Featuring3"
        ];

        // let i = 1;
        // let j = 0;
        // for(let tag of tags) {
        //     temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), tag])
        //     i++;
        //     j++;
        // }
        let wordKey = 0;
        for (let i = 1; i < count + 1; i++){
            for (let j = 0; j < count; j++){
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), tags[wordKey]]);
                wordKey++;
            }
        }

        return temp
    }, [count, radius])
    return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
}

export default function TagCloud(){
    return (
        <Canvas className="tagCloud" dpr={[1, 2]} camera={{position: [0, 0, 35], fov: 100 }}>
            <fog attach="fog" args={['#202025', 0, 80]} />
            <Suspense fallback={null}>
                <group rotation={[10, 10.5, 10]}>
                    <Cloud count={6} radius={20} />
                </group>
            </Suspense>
            <TrackballControls />
        </Canvas>
    )
}