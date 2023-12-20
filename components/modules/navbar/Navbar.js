import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Navbar.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   setSearch(() => {
  //     return router.query.q;
  //   });
  //   if (!!search.trim()) {
  //     router.push({
  //       pathname: "/search",
  //       query: { q: search },
  //     });
  //   } else {
  //     router.push("/");
  //   }
  // }, [search]);

  useEffect(() => {
    setSearch(router.query.q);
  }, [search]);

  const searchHandler = async () => {
    if (!!search.trim()) {
      await router.push({
        pathname: "/search",
        query: { q: search },
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_search}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="جستجو کنید...."
        />
        <span onClick={searchHandler} className={styles.navbar_search_icon}>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
      <div className={styles.navbar_user_avatar}>
        <img src="/images/avatar/avatar.png" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
