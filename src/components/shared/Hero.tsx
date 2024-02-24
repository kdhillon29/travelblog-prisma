import Tag from "../ui/Tag";
import Overlay from "../ui/Overlay";
import Link from "next/link";
import Image from "next/image";
import { PostTypes } from "@/types/postTypes";
import { formatDate } from "@/utils/formatDate";
import { blogData } from "@/constants/blogData";

const post = blogData[0];
const Hero: React.FC<{ posts: (typeof post)[] }> = ({ posts }) => {
  const featuredPost = posts.filter((post) => post.featured === true);

  const topFeatured = featuredPost.slice(0, 1);
  const bottomFeatured = featuredPost.slice(1, 4);

  return (
    <section className="relative">
      <div className="w-[95%] mx-auto max-w-[1450px] z-1">
        {topFeatured.map((post) => (
          <article
            key={post.id}
            className="flex flex-col gap-5 mb-5 text-center relative"
          >
            <Tag text={post.tags.toString()} />

            <h2 className="text-3xl max-sm:text-xl font-extrabold uppercase text-tertiary">
              {post.title}
            </h2>
            <div className="flex items-center gap-3 font-light text-tertiary justify-center">
              {post.authorImage && (
                <Image
                  src={post.authorImage}
                  height={50}
                  width={50}
                  alt={`Image of ${post.authorName}`}
                  className="rounded-full drop-shadow-lg"
                />
              )}
              <span>{post.authorName}</span>
              <span className=" italic">{formatDate(post.publishDate)}</span>
            </div>
            <Link href={{ pathname: `/blog/${post.id}`, query: { ...post } }}>
              <div className="relative max-h-[400px] w-full  overflow-hidden shadow-xl">
                {post.image_path && (
                  <Image
                    width={100}
                    height={100}
                    src={post.image_path}
                    alt={`image for ${post.title}`}
                    className="object-cover  w-full h-fit  max-sm:h-64"
                  />
                )}
                <Overlay />
              </div>
            </Link>
          </article>
        ))}

        <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-1">
          {bottomFeatured.map((post) => (
            <article
              key={post.id}
              className="flex flex-col gap-3 items-center text-center relative"
            >
              <Link
                className="w-full"
                href={{ pathname: `/blog/${post.id}`, query: { ...post } }}
              >
                <div className="relative  overflow-hidden h-72 shadow-xl w-full">
                  {post.image_path && (
                    <Image
                      fill
                      src={post.image_path}
                      alt={`image for ${post.title}`}
                      className="object-cover w-full h-full"
                    />
                  )}
                  <Overlay />
                </div>
              </Link>

              <Tag text={post.tags.toString()} />
              <h3 className="text-1xl font-extrabold uppercase text-tertiary px-5">
                {post.title}
              </h3>
              <span className="font-light italic">
                {formatDate(post.publishDate)}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
