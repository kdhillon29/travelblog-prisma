import Tag from "@/components/ui/Tag";
import Image from "next/image";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import { PostTypes } from "@/types/postTypes";
import { formatDate } from "@/utils/formatDate";
import { blogData } from "@/constants/blogData";

const postType = blogData[0];

// const getData = async (id: string) => {
//   const res = await fetch(`http://localhost:3000/api/post/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };

const page = async ({ searchParams }: { searchParams: typeof postType }) => {
  const post = searchParams;
  //   console.log(searchParams);
  //   const post = await getData(id);
  return (
    <div className="w-[95%] mx-auto max-w-[1450px]">
      <div className="w-full h-[400px] max-sm:h-64 relative mb-2">
        <Image
          fill
          alt="image for blog"
          src={post.image_path}
          className="object-cover"
        />
      </div>

      <Tag text={post.tags.toString()} />
      <h2 className="text-4xl font-extrabold uppercase text-tertiary my-3">
        {post.title}
      </h2>
      <div className="mt-5 flex gap-5 items-center">
        <Image
          src={post.authorImage}
          width={500}
          height={500}
          alt={`Image of ${post.authorName}`}
          className="rounded-full w-20 h-20 object-cover"
        />
        <div className="flex gap-1 flex-col">
          <span>{post.authorName}</span>
          <span>{formatDate(post.publishDate)}</span>
        </div>
      </div>
      <div className="flex md:gap-10 gap-5 relative mt-2 md:flex-row flex-col">
        <aside
          className="md:sticky
        md:top-3/4 md:h-1/4 px-4
        "
        >
          <span className="uppercase text-2xl font-extrabold text-tertiary">
            Share:
          </span>
          <div className="flex text-3xl gap-5 text-gray-400 mt-2 [&>*]:border">
            <AiOutlineFacebook />
            <AiOutlineInstagram />
            <AiOutlineTwitter />
          </div>
        </aside>

        <article>
          <p className="text-lg text-gray-600 text-justify w-full px-12">
            {post.paragraph}
          </p>
        </article>
      </div>
    </div>
  );
};

export default page;
