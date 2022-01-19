import $api from "http/index.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Analysis.sass";

export default function Analysis() {
  const [availability, setAvailability] = useState(null);

  const {
    itemValues: { name },
  } = useSelector((state) => state.total);

  useEffect(() => {
    const fetchData = async () => {
      const data = await $api.get(`analysis/${name}`).then(({ data }) => data);
      setAvailability(data);
    };

    fetchData();
  }, []);

  return (
    <div className="item-analysis">
      <div className="item-analysis-info">
        <h3>В наличии:</h3>
        <p>{availability?.inStock?.kolvo}</p>
      </div>
      <div className="item-analysis-info">
        <h3>{availability?.listed?.kolvo ? "Числится:" : "Не числится"}</h3>
        <p>{availability?.listed?.kolvo}</p>
      </div>
    </div>
  );
}
