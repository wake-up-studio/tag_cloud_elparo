import TagCloud from './components/tagCloud.jsx';

export default function Home() {
    window.addEventListener('DOMContentLoaded', () => {
        return (
            <div className="body">
                <h1>Catégories</h1>
                <TagCloud />
            </div>
        );
    })
}
