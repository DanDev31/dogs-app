import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DogCard } from "../card/DogCard";
import { Pagination } from "../pagination/Pagination";
import { fetchData } from "../../features/fetchAPI/fetchSlice";
import { Loader } from "../loader/Loader";

export const DogCards = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.fetch.data);
  const page = useSelector((state) => state.fetch.pagination);

  // const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);

  if (dogs) {
    return <h3>Data is not avalible.</h3>;
  }

  const byPage = 10;
  const max = Math.ceil(dogs.length / byPage);

  useEffect(() => {
    dispatch(fetchData());
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [dispatch]);

  return (
    <section>
      {loading ? (
        dogs?.length > 0 && dogs ? (
          <>
            <div className="cards__container">
              {dogs
                .slice((page - 1) * byPage, (page - 1) * byPage + byPage)
                .map((dog) => (
                  <DogCard key={dog.id} {...dog} />
                ))}
            </div>
            <Pagination page={page} max={max} />
          </>
        ) : (
          <p className="cards__container-nofound-message">
            There is not a breed with that name.
          </p>
        )
      ) : (
        <Loader />
      )}
    </section>
  );
};
