import Button from "@/components/Button";

const Hero = () => {
  return (
    <section
      className={
        "relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32 bg-black-200"
      }
    >
      {/*<Element name={"hero"}>*/}
      <div className={"container"}>
        <div className={"relative z-2 max-w-512 max-lg:max-w-388"}>
          <div className={"caption small-2 uppercase text-p3"}>
            Video Editing
          </div>

          <h2
            className={
              "mb-6 h1 text-p4 uppercase mx-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12"
            }
          >
            Amazing simple
          </h2>
          <p className={"max-w-440 mb-14 body-1 max-md:mb-10 text-white"}>
            We designed XORA AI Video Editor to be an easy to use, quick to
            learn, and surprisingly powerful
          </p>
          <Button icon={"/images/zap.svg"} to={"features"}>Try it now</Button>
        </div>

        <div
          className={"hero-img_res"}
        >
          <img
            src="/images/hero.png"
            alt="hero"
          // className={"size-960 max-lg:size-640 max-md:size-640 max-md:h-auto"}
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
