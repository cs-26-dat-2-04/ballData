import styles from '../components/styles.module.css';

export default function StatCard({title, data, extra_info, icon}){ // The backend will insert the values into the parameters.
return ( // We are currently using placeholders until we link frontend to backend
    <article className={styles.card}>
        <h1>{title}</h1>
        <h2>{data}</h2>
        <p>{extra_info}</p>
        <img src={icon} alt="icon"/>
    </article>   
    );
}