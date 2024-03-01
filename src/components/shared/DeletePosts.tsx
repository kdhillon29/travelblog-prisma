"use client";

import { useState } from "react";
import { deletePost } from "@/actions/blogActions";
import Button from "../ui/Button";
import { PostTypes } from "@/types/postTypes";
import Input from "../ui/Input";
import Loader from "../ui/Loader";
import { useEdgeStore } from "@/lib/edgestore";
import prisma from "@/lib/prismadb";

const DeletePosts: React.FC<{ post: PostTypes }> = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { edgestore } = useEdgeStore();
  const { id, img } = post;

  async function handleSubmit() {
    setLoading(true);
    await edgestore.publicFiles.delete({
      url: img as string,
    });
    closeModal();
  }
  const handleDelete = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="">
      <Button aria="delete post" onClick={handleDelete} text="Delete" action />

      {showModal && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            {loading && (
              <div className=" absolute top-20 ">
                <Loader />{" "}
              </div>
            )}
            <div className="w-screen h-screen bg-black/40 absolute" />
            <div
              className="bg-white p-6 rounded shadow-lg z-40"
              onClick={(e) => e.stopPropagation()}
            >
              <p>Are you sure you want to delete this post?</p>
              <div className="flex gap-3 mt-5">
                <form action={deletePost} onSubmit={handleSubmit}>
                  <Input type="hidden" name="postId" value={id} />
                  <Button aria="delete post" type="submit" text="Yes" />
                </form>
                <Button
                  aria="cance delete post"
                  onClick={closeModal}
                  text="No"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeletePosts;
