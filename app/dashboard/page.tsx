/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Dashboard,
  LocationCity,
  LocationOn,
  Thermostat,
} from "@mui/icons-material";
import HomeTab from "./tabs/home-tab";
import LocationTab from "./tabs/location-tab";
import TemperatureTab from "./tabs/temperature-tab";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const { data: session, status }: any = useSession();
  if (!session || status == "loading") {
    return null;
  }
  const router = useRouter();

  useEffect(() => {
    if (!session || status == "loading") {
      router.push("/");
    }
  }, [router, status, session]);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<number>(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box bgcolor={"white"} sx={{ display: "flex" }} height="100vh">
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation={0.0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Weather dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Location", "Temperature"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => setCurrentTab(index)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <Dashboard />
                  ) : index === 1 ? (
                    <LocationOn />
                  ) : (
                    <Thermostat />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {currentTab === 0 ? (
          <HomeTab />
        ) : currentTab === 1 ? (
          <LocationTab />
        ) : (
          <TemperatureTab />
        )}
      </Box>
    </Box>
  );
}

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { ILocation, IWeather } from "../interface";
// import { styling1 } from "../signup/commen";
// import React, { useEffect, useState } from "react";

// import { MdOutlineSaveAlt } from "react-icons/md";
// import { useRouter } from "next/navigation";

// import { useQuery } from "@apollo/client";
// import { useSession } from "next-auth/react";

// export default function page() {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { data: session }: any = useSession();
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const router = useRouter();

//   const RECENT_SEARCH_KEY = "recentSearch";
//   const MAX_RECENT_SEARCHES = 8;
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [recentSearch, setRecentSearch] = useState<string[]>([]);
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [searchedText, setSearchedText] = useState<string>("");
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [weatherDetails, setWeatherDetails] = useState<IWeather>(
//     {} as IWeather
//   ); // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [locationDetails, setLocationDetails] = useState<ILocation>(
//     {} as ILocation
//   ); // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [isCelsius, setIsCelsius] = useState(true);

//   const searchFieldInputHandler = (e: HTMLInputElement | any) => {
//     e.preventDefault();
//     setSearchedText(e.target.value);
//   };

//   const toggleUnit = () => {
//     setIsCelsius((prev) => !prev);
//   };

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     let parsedSearches: any;
//     const storedSearches = localStorage.getItem(RECENT_SEARCH_KEY);
//     if (storedSearches) {
//       parsedSearches = JSON.parse(storedSearches);
//       setRecentSearch(parsedSearches.slice(-MAX_RECENT_SEARCHES));
//     }

//     const initial = async () => {
//       try {
//         // const response = await axios.get(
//         //   `https://api.openweathermap.org/data/2.5/weather?q=dubai&appid=194a7cd0c0c908fe97fb75e83911d1ab`
//         // );

//         const response = await axios.get(
//           `https://api.weatherapi.com/v1/current.json?key=25910174a87a4c63a6c141019230506&q=dubai&aqi=no`
//         );

//         console.log("WEATHER RESPONSE :: ", response.data);

//         if (response.data) {
//           setLocationDetails(response.data?.location);
//           setWeatherDetails(response.data?.weather);
//           setSearchedText("");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     initial();
//   }, []);

//   const search = async () => {
//     try {
//       const response = await axios.get(
//         `https://api.weatherapi.com/v1/current.json?key=25910174a87a4c63a6c141019230506&q=${searchedText}&aqi=no`
//       );
//       if (response.data) {
//         setLocationDetails(response.data?.location);
//         setWeatherDetails(response.data?.current);

//         setSearchedText("");

//         setRecentSearch((prevSearches) => {
//           const updatedSearches = [...prevSearches, searchedText].slice(
//             -MAX_RECENT_SEARCHES
//           );
//           localStorage.setItem(
//             RECENT_SEARCH_KEY,
//             JSON.stringify(updatedSearches)
//           );
//           return updatedSearches;
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleLogout = async () => {
//     // await signOut();
//     router.push("/");
//     localStorage.clear();
//   };

//   const searchWith = async (name: string | any) => {
//     try {
//       const response = await axios.get(
//         `https://api.weatherapi.com/v1/current.json?key=25910174a87a4c63a6c141019230506&q=${name}&aqi=no`
//       );
//       if (response.data) {
//         setLocationDetails(response.data.location);
//         setWeatherDetails(response.data.current);
//         setSearchedText("");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // return (
//   //   <main className="flex min-h-screen w-full flex-col items-center justify-center relative bg-gradient-to-tl bg-opacity-80 bg-blue-100  from-blue-400">
//   //     <p className="text-red-500">Hello Maurice</p>
//   //     {weatherDetails?.condition && (
//   //       <div
//   //         className="flex lg:w-3/4 w-11/12 mx-auto rounded-tl-2xl lg:flex-row flex-col rounded-br-2xl"
//   //         style={styling1}
//   //       >
//   //         <div className="lg:w-4/6 w-4/5 lg:relative bg-opacity-50 mx-auto lg:h-[560px] h-300px lg:p-0 p-3">
//   //           <div className=" p-1 lg:my-7 my-4 ml-16">
//   //             <Image
//   //               src={`https:${weatherDetails?.condition?.icon}`}
//   //               width={120}
//   //               height={120}
//   //               alt="Picture of the background"
//   //             />
//   //           </div>

//   //           <motion.div
//   //             initial={{ opacity: 0, scale: 0.5 }}
//   //             animate={{ opacity: 1, scale: 1 }}
//   //             transition={{ duration: 0.5 }}
//   //             className="lg:absolute lg:bottom-10 lg:left-0 lg:right-0 text-center flex lg:flex-row flex-col lg:justify-center justify-between mx-2 items-center lg:gap-10 gap-3"
//   //           >
//   //             <p className="lg:text-8xl text-5xl font-sans font-semibold text-gray-100 flex items-center">
//   //               {isCelsius ? (
//   //                 <>
//   //                   {Math.round(weatherDetails.temp_c)}
//   //                   <sup className="lg:text-5xl text-2xl">o </sup>
//   //                   <span className="lg:text-7xl text-4xl"> C</span>
//   //                 </>
//   //               ) : (
//   //                 <>
//   //                   {Math.round(weatherDetails.temp_f)}
//   //                   <sup className="lg:text-5xl text-2xl">o </sup>
//   //                   <span className="lg:text-7xl text-4xl"> F</span>
//   //                 </>
//   //               )}
//   //             </p>
//   //             <div className="lg:w-[30%] w-full">
//   //               <p className="lg:text-4xl text-xl text-gray-100">
//   //                 {locationDetails.country}
//   //               </p>
//   //               <p className="text-gray-100 lg:text-sm text-xs">
//   //                 <span className="font-semibold text-md">
//   //                   {locationDetails.name}{" "}
//   //                 </span>
//   //                 {locationDetails.localtime}
//   //               </p>
//   //             </div>
//   //             <div className="text-md text-gray-200 lg:block hidden">
//   //               <p className="lg:text-lg text-sm text-gray-100">
//   //                 {weatherDetails?.condition?.text}
//   //               </p>
//   //               <small className="flex flex-col">
//   //                 <span>Humidity: {weatherDetails.humidity}%</span>
//   //                 {isCelsius ? (
//   //                   <span>Wind:{weatherDetails.wind_kph} km/h</span>
//   //                 ) : (
//   //                   <span>Wind:{weatherDetails.wind_mph} m/h</span>
//   //                 )}
//   //               </small>
//   //             </div>
//   //             <div className="flex items-center">
//   //               <button
//   //                 onClick={() => {
//   //                   setIsCelsius(true);
//   //                 }}
//   //                 className={`px-2 py-1 ${
//   //                   isCelsius ? "bg-blue-500" : "bg-gray-500"
//   //                 } text-white text-xs rounded-l-md focus:outline-none`}
//   //               >
//   //                 Metric °C,km/h
//   //               </button>
//   //               <button
//   //                 onClick={() => {
//   //                   setIsCelsius(false);
//   //                 }}
//   //                 className={`px-2 py-1 ${
//   //                   !isCelsius ? "bg-blue-500" : "bg-gray-500"
//   //                 } text-white text-xs rounded-r-md focus:outline-none`}
//   //               >
//   //                 Imperial °F,m/h
//   //               </button>
//   //             </div>
//   //           </motion.div>
//   //         </div>

//   //         <div className="flex-grow bg-opacity-70 bg-slate-600 rounded-br-2xl p-4 relative  text-white">
//   //           {session && (
//   //             <p className="text-lg text-center">Welcome {session.user.name}</p>
//   //           )}
//   //           <div className="w-full p-2 ">
//   //             <input
//   //               value={searchedText}
//   //               type="text"
//   //               onChange={searchFieldInputHandler}
//   //               className="text-gray-100 w-[80%] bg-transparent border rounded-md px-2 py-1 border-gray-100"
//   //               placeholder="Search here"
//   //             />
//   //             <button
//   //               onClick={search}
//   //               className="w-[18%] py-1 ml-1 bg-white text-amber-600 rounded"
//   //             >
//   //               Search
//   //             </button>
//   //           </div>
//   //           <div className="my-4 p-2">
//   //             <p className="font-light text-white">Recent search</p>
//   //             <hr />
//   //             <div className="my-3  flex flex-col gap-2">
//   //               {recentSearch.map((place: string, index: number) => (
//   //                 <div
//   //                   key={index}
//   //                   className="cursor-pointer flex px-3 py-1 bg-gray-700 bg-opacity-50  h-8 justify-between"
//   //                 >
//   //                   <p onClick={() => searchWith(`${place}`)} key={place}>
//   //                     {place}
//   //                   </p>
//   //                   <div className=" flex items-center ">
//   //                     <MdOutlineSaveAlt className="text-2xl" />
//   //                   </div>
//   //                 </div>
//   //               ))}
//   //             </div>
//   //           </div>
//   //           <p
//   //             className="text-center text-sm absolute lg:bottom-10 bottom-[-60px] left-0 right-0 cursor-pointer"
//   //             onClick={handleLogout}
//   //           >
//   //             log out
//   //           </p>
//   //         </div>
//   //       </div>
//   //     )}
//   //   </main>
//   // );
// }
