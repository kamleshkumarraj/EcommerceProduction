
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/cart/Loader";
import { useGetSingleBlogQuery } from "../../../store/slices/blogApi";
import Comments from "../comments/Comments";
import Menu from "../Menu/Menu";
import styles from "./singlePage.module.css";

const SinglePage =  () => {
  const blogId = useParams()?.blog_id

  const {data , isLoading , refetch} = useGetSingleBlogQuery(blogId);
  
  const createdAt = new Date(data?.createdAt).toLocaleDateString('en-GB');
  console.log(data)
  useEffect(() => {
    refetch();
  },[blogId, refetch])
  console.log(isLoading)
  if(isLoading) return <Loader />

  return (
    <div style={{paddingInline : '4rem'}} className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.creatorDetails?.avatar?.url && (
              <div className={styles.userImageContainer}>
                <img src={data?.creatorDetails?.avatar?.url} alt=""  className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.creatorDetails?.creatorName}</span>
              <span className={styles.date}>{createdAt}</span>
            </div>
          </div>
        </div>
        {data?.thumbnail &&(
          <div className={styles.imageContainer}>
            <img src={data?.thumbnail?.url} alt="blog-images"  className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            style={{fontSize : '16px'}}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
          <div
            className={styles.description}
            style={{marginTop : '30px' , fontSize : '16px'}}
            dangerouslySetInnerHTML={{ __html: data?.summary }}
          />
          <div className={styles.comment}>
            <Comments postSlug={'cullture'}/>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
