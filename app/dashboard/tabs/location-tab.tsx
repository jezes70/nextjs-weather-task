import DialogSlide from "@/app/components/dialog";
import { IWeather, ILocation } from "@/app/interface";
import {
  Box,
  Button,
  Grid,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

interface ILoca {
  data: any;
}

export default function LocationTab() {
  const [recentSearch, setRecentSearch] = React.useState([]);
  const [currKey, setCurrKey] = React.useState("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const recentSearches = localStorage.getItem("recentSearch");

    if (recentSearches) {
      setRecentSearch(JSON.parse(recentSearches));
    }
  }, []);

  const Item = ({ data }: ILoca) => {
    const [weatherDetails, setWeatherDetails] = useState<IWeather>(
      {} as IWeather
    );
    const [locationDetails, setLocationDetails] = useState<ILocation>(
      {} as ILocation
    );

    React.useEffect(() => {
      const search = async () => {
        try {
          console.log("SJK :: ", data);

          const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=25910174a87a4c63a6c141019230506&q=${data}&aqi=no`
          );

          console.log("API DATA :: ", response.data);

          if (response.data) {
            setLocationDetails(response.data?.location);
            setWeatherDetails(response.data?.current);
          }
        } catch (error) {
          console.log("SEarch ERROR HERE ...", error);
        }
      };
      search();
    }, []);

    return (
      <ListItemButton onClick={() => setOpen(true)}>
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>Country</Typography>
              <Typography variant="body1">
                {locationDetails?.country}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>Region</Typography>
              <Typography variant="body1">{locationDetails?.region}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography>Local Time</Typography>
              <Typography variant="body1">
                {locationDetails?.localtime}
              </Typography>
            </Grid>
          </Grid>
        </>
      </ListItemButton>
    );
  };

  return (
    <Box color="black">
      <DialogSlide
        body={<Item data={currKey} />}
        open={open}
        setOpen={setOpen}
        title="Location details ... "
      />
      <Typography variant="h6" gutterBottom>
        Recent Searches
      </Typography>
      <Toolbar />
      {recentSearch.map((search) => (
        <Button
          sx={{ textTransform: "capitalize" }}
          key={search}
          onClick={() => {
            setOpen(true);
            setCurrKey(search);
          }}
        >
          <Typography>{search}</Typography>
        </Button>
      ))}
    </Box>
  );
}
