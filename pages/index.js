import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
export default function Home() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetch(
            "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=338e30fde1de4c7f969b0dad37920e6d"
        )
            .then((res) => res.json())
            .then((response) => {
                const { articles } = response;
                setArticles(articles);
            });
        console.log(articles);
    }, []);
    const router = useRouter();
    return (
        <div className={styles.container}>
            <h1> Learning Next Js</h1>
            <Link href="/about"> ir a about</Link>

            <PageLayout>
                <div className={styles.container}>
                    {articles.length === 0 && <p>loading...</p>}

                    {articles.length > 0 && (
                        <div>
                            {articles.map((article, index) => (
                                <article key={index}>
                                    <img src={article.urlToImage}/>
                                    <h2>{article.title}</h2>
                                    <p>{article.description}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </PageLayout>
        </div>
    );
}
