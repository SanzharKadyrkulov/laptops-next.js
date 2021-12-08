import { MainLayout } from "../components/MainLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchLaptops, SetLaptopPage } from "../store/actions/laptopActions";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import LaptopCard from "../components/LaptopCard";
import { useRouter } from "next/router";
import axios from "axios";
import { auth } from "../firebase";
import { onAuthStateChanged } from "@firebase/auth";

export default function Index() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "SET_USER",
        payload: user,
      });
    });
  }, []);

  const { laptops, page, limit, loading, error } = useTypedSelector(
    (state) => state.laptop
  );
  const [pages, setPages] = useState([]);
  const getPages = async (limit: number): Promise<any> => {
    let arr = [];

    const { data } = await axios.get(
      "http://localhost:8000/laptops/" + window.location.search
    );
    const n = Math.ceil(data.length / limit);

    for (let i = 1; i <= n; i++) {
      arr.push(i);
    }
    setPages(arr);
  };
  useEffect(() => {
    dispatch(fetchLaptops(page));
  }, [page]);
  useEffect(() => {
    getPages(limit);
  }, [laptops]);

  const [brandVaule, setBrandValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const filterLaptops = (key, value) => {
    let search = new URLSearchParams(window.location.search);
    search.set(key, value);
    const newUrl = `${window.location.pathname}?${search}`;
    router.push(newUrl);
    setTimeout(() => {
      dispatch(fetchLaptops(page));
    }, 500);
    setBrandValue(value);
  };
  // if (loading) return <CircularProgress />;
  if (error) return <h2>{error}</h2>;
  return (
    <>
      <MainLayout title={"Home Page"}>
        <h1>Laptops</h1>
        <div className="mainContainer">
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sort</FormLabel>
              <RadioGroup
                aria-label="sort"
                value={brandVaule}
                name="radio-buttons-group"
                onChange={(e) => filterLaptops("brand", e.target.value)}
              >
                <FormControlLabel
                  value="samsung"
                  control={<Radio />}
                  label="Samsung"
                />
                <FormControlLabel
                  value="apple"
                  control={<Radio />}
                  label="Apple"
                />
                <FormControlLabel
                  value="huawei"
                  control={<Radio />}
                  label="Huawei"
                />
              </RadioGroup>
            </FormControl>
            <Button
              onClick={() => {
                router.push("/");
                setTimeout(() => {
                  dispatch(fetchLaptops(page));
                }, 500);
                setBrandValue("");
              }}
            >
              Reset
            </Button>
            <div style={{ display: "flex", margin: "0 auto" }}>
              {pages &&
                pages?.map((p) => (
                  <div
                    onClick={() => {
                      dispatch(SetLaptopPage(p));
                    }}
                    style={{
                      border: p === page ? "2px solid blue" : "1px solid gray",
                      padding: 10,
                      borderRadius: "10px",
                      marginRight: "1px",
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </div>
                ))}
            </div>
          </div>
          <div className="laptopsContainer">
            {!loading ? (
              laptops ? (
                laptops.map((laptop) => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))
              ) : (
                <CircularProgress />
              )
            ) : (
              <CircularProgress />
            )}
          </div>
        </div>
      </MainLayout>
      <style jsx>{`
        .mainContainer {
          display: grid;
          grid-template-columns: 200px 1fr;
        }
        .laptopsContainer {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
      `}</style>
    </>
  );
}
