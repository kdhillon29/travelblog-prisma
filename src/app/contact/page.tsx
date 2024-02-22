import Image from "next/image";
import Overlay from "@/components/ui/Overlay";
import Button from "@/components/ui/Button";
import Map from "@/components/ui/Map";

const page = () => {
  return (
    <div>
      <div className="relative h-[30vh] max-sm:h-32 w-full">
        <Image
          src="/assets/contact.jpg"
          fill
          alt="contact image"
          className="object-cover"
        />
        <Overlay />
        <h1 className="flex absolute w-full h-full justify-center items-center text-4xl font-extrabold uppercase text-white">
          Contact Us
        </h1>
      </div>

      <div className="p-10 leading-8 text-lg mt-10 relative m-auto rouded-lg text-center">
        <h1 className="text-4xl font-extrabold w-full text-center uppercase text-primary mb-10">
          Let&apos;s Discuss
        </h1>

        <form className="flex flex-col w-full gap-2">
          <div className="flex gap-5 max-sm:flex-col">
            <input
              type="text"
              placeholder="Name"
              className="p-1 border-gray-300 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-1  border-gray-300 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="flex gap-5 max-sm:flex-col">
            <input
              type="text"
              placeholder="Subject"
              className="p-1 border-gray-300 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary outline-none"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="p-1 border-gray-300 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            rows={8}
            className="p-1 border-gray-300 w-full rounded-md text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary outline-none"
          />
          <div className="flex justify-center">
            <Button aria="submit contact form" text="Submit" />
          </div>
        </form>
      </div>
      <Map />
    </div>
  );
};

export default page;
