"use client";

import { IWeather, ILocation } from "@/app/interface";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function HomeTab() {
  const RECENT_SEARCH_KEY = "recentSearch";
  const MAX_RECENT_SEARCHES = 8;

  const [searchKey, setSearchKey] = React.useState("");
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [weatherDetails, setWeatherDetails] = useState<IWeather>(
    {} as IWeather
  );
  const [locationDetails, setLocationDetails] = useState<ILocation>(
    {} as ILocation
  );

  const search = async () => {
    try {
      console.log("SJK :: ", searchKey);

      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=25910174a87a4c63a6c141019230506&q=${searchKey}&aqi=no`
      );

      console.log("API DATA :: ", response.data);

      if (response.data) {
        setLocationDetails(response.data?.location);
        setWeatherDetails(response.data?.current);

        // setSearchKey("");

        setRecentSearch((prevSearches) => {
          const updatedSearches = [...prevSearches, searchKey].slice(
            -MAX_RECENT_SEARCHES
          );

          localStorage.setItem(
            RECENT_SEARCH_KEY,
            JSON.stringify(updatedSearches)
          );
          return updatedSearches;
        });
      }
    } catch (error) {
      console.log("SEarch ERROR HERE ...", error);
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="start"
      color={"black"}
    >
      <Box
        width="100vw"
        display="flex"
        flexDirection="row"
        justifyContent="start"
        alignItems="center"
        p={4}
      >
        <TextField
          variant="outlined"
          value={searchKey}
          size="small"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
        <Button
          startIcon={<Search />}
          variant="contained"
          sx={{ bgcolor: "blue" }}
          onClick={() => search()}
        >
          Search
        </Button>
      </Box>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography>Country</Typography>
          <Typography variant="body1">{locationDetails?.country}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography>Region</Typography>
          <Typography variant="body1">{locationDetails?.region}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography>Local Time</Typography>
          <Typography variant="body1">{locationDetails?.localtime}</Typography>
        </Grid>
      </Grid>

      <br />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography>Latitude</Typography>
          <Typography variant="body1">{locationDetails?.lat}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography>Longitude</Typography>
          <Typography variant="body1">{locationDetails?.lon}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography>Time Zone</Typography>
          <Typography variant="body1">{locationDetails?.tz_id}</Typography>
        </Grid>
      </Grid>

      <br />
      <Divider />
      <br />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography>Weather Condition</Typography>
          <Typography variant="body1">
            {weatherDetails?.condition?.text}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography>Humidity</Typography>
          <Typography variant="body1">{weatherDetails?.humidity}</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography>Last Updated</Typography>
          <Typography variant="body1">
            {weatherDetails?.last_updated}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeTab;
