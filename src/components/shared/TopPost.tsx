import Image from "next/image";
import Link from "next/link";
import Tag from "../ui/Tag";
import Overlay from "../ui/Overlay";
import { PostTypes } from "@/types/postTypes";
import { formatDate } from "@/utils/formatDate";
const TopPost: React.FC<{ posts: PostTypes[] }> = ({ posts }) => {
  const topPost = posts.filter((post) => post.topPost === true);
  return (
    <section aria-labelledby="top-post" className="w-full">
      <div className="w-full text-center">
        <h2
          id="top-post"
          className="text-center text-2xl font-extrabold uppercase text-tertiary inline-block px-2 my-6  border-b-4 border-b-orange-400"
        >
          Top Post
        </h2>
      </div>

      <div className="flex w-full   h-full flex-col gap-2">
        {topPost.map((post, index) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <article>
              <div className="relative cursor-pointer w-[100%] h-[200px]">
                {post.img && (
                  <Image
                    src={post.img}
                    fill={true}
                    alt={`Image for ${post.title}`}
                  />
                )}
                <Overlay />
              </div>
              <div className="w-full flex justify-center">
                <Tag text={post.category} />
              </div>

              <h3 className="font-extrabold uppercase text-tertiary text-center">
                {post.title}
              </h3>

              <div className="flex gap-2 text-xs justify-center mt-2">
                <span className="font-light">By: {post.user.name}</span>
                <span className="italic font-light">
                  {formatDate(post.createdAt.toString())}
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopPost;
