import styles from '../components/styles.module.css';
import Image from 'next/image'

export default function Card({title, data, extra_info, icon}){
return (
    <article className={styles.card}>
        <h1>Sejrsrate</h1>
        <h2>64.3%</h2>
        <p>18V - 7T - 3U</p>
        <img src="/icon1.jpg" alt="icon"/>
    </article>   
    );
}