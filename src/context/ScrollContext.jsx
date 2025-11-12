import { createContext, useRef } from "react";

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const breedRef = useRef(null);
  const productRef = useRef(null);
  const blogRef = useRef(null);
  const downRef = useRef(null);
  const upRef = useRef(null);

  const scrollToBreed = () => {
    breedRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProduct = () => {
    productRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBlog = () => {
    blogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDown = () => {
    downRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToUp = () => {
    upRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider
      value={{
        scrollToBreed,
        scrollToProduct,
        scrollToBlog,
        scrollToDown,
        scrollToUp,
        upRef,
        downRef,
        breedRef,
        productRef,
        blogRef,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
