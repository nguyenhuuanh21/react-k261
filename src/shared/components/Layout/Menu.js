import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../../services/Api";
const Menu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <nav>
        <div id="menu" className="collapse navbar-collapse">
          <ul>
            {categories.map((category) => (
              <li className="menu-item" key={category._id}>
                <Link to={`/category/${category._id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menu;
