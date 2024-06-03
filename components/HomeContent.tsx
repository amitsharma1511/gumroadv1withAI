import MakeMoneyButton from "@/components/MakeMoneyButton";

export default function HomeContent() {
  return (
    <>
      <div className="flex space-x-8">
        <div className="w-1/2 space-y-6">
          <div className="flex items-start">
            <span className="inline-block w-6 h-6 bg-yellow-500 text-white text-center font-bold rounded-full">
              1
            </span>
            <div className="ml-4">
              <h2 className="text-xl font-bold">
                Take a file or a link of value.
              </h2>
              <p>
                This can be anything. From a link to an exclusive build of an
                app, to a secret blog post, to an icon you spent hours
                designing.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="inline-block w-6 h-6 bg-red-500 text-white text-center font-bold rounded-full">
              2
            </span>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Share it.</h2>
              <p>
                Just like any old link. Choose your own price. You don't have to
                create a store. And you don't have to do any management.{" "}
                <a href="#" className="text-blue-500">
                  Click here
                </a>{" "}
                for an example.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="inline-block w-6 h-6 bg-green-500 text-white text-center font-bold rounded-full">
              3
            </span>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Make money.</h2>
              <p>
                And that's it. At the end of each month we'll deposit the money
                you've earned to your account.
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-white p-6 rounded-lg flex items-center justify-center">
          <MakeMoneyButton />
        </div>
      </div>

      <p className="mt-6">
        Still don't get it?{" "}
        <a href="#" className="text-blue-500">
          Watch a video.
        </a>
      </p>
    </>
  );
}
