import Tag from "@/components/ui/Tag";
import Image from "next/image";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import { PostTypes } from "@/types/postTypes";
import { formatDate } from "@/utils/formatDate";

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const page = async ({ params }: { params: PostTypes }) => {
  const { id } = params;
  const post = await getData(id);
  return (
    <div className="w-[90%] mx-auto h-auto max-w-[1450px]">
      <div className="w-full px-12 h-[400px] max-sm:h-[200px] relative mb-5">
        <Image
          fill
          alt="image for blog"
          src={post.img}
          className="object-cover backg"
        />
      </div>

      <Tag text={post.category} />
      <h2 className="text-3xl font-extrabold uppercase text-tertiary my-3">
        {post.title}
      </h2>

      <div className="flex md:gap-20 gap-5 relative mt-10 md:flex-row flex-col">
        <aside
          className="md:sticky
        md:bottom-0 md:h-1/2
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

        <article className="flex flex-col gap-8">
          <div className=" flex gap-6 items-center">
            <Image
              src={post.user.image || "/assets/avatar.jpg"}
              width={50}
              height={50}
              alt={`Image of ${post.authorName}`}
              className="rounded-full object-cover"
            />
            <div className="flex gap-1 flex-col text-gray-500">
              <span> Author:{post.user.name}</span>
              <span>published on:{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <div
            className="text-xl  px-2 py-6 text-justidy w-full text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.desc }}
          >
            {/* {post.desc} */}
            {/* <div dangerouslySetInnerHTML={{ __html: post.desc }}></div> */}
          </div>
        </article>
      </div>
    </div>
  );
};

export default page;
