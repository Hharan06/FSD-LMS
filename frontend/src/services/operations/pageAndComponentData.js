import React from 'react'
// import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { courseEndpoints } from '../apis';


// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId) => {
  // const toastId = toast.loading("Loading...");
  let result = [];
  try {
    // Use getAllCourses endpoint since getCategoryPageDetails doesn't exist
    const response = await apiConnector("GET", courseEndpoints.GET_ALL_COURSE_API);

    if (!response?.data?.success)
      throw new Error("Could not Fetch courses data");

    console.log("CATALOG PAGE DATA API RESPONSE............", response)
    
    // Transform the response to match expected catalog structure
    const courses = response?.data?.data || [];
    result = {
      selectedCategory: {
        name: "All Courses",
        description: "Browse all available courses",
        courses: courses
      },
      differentCategory: {
        name: "Popular Courses", 
        courses: courses.slice(0, 4) // Show first 4 as popular
      },
      mostSellingCourses: courses.slice(0, 6) // Show first 6 as most selling
    };

  }
  catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    // toast.error(error.response?.data.message);
    result = {
      selectedCategory: { name: "All Courses", description: "Browse all available courses", courses: [] },
      differentCategory: { name: "Popular Courses", courses: [] },
      mostSellingCourses: []
    };
  }
  // toast.dismiss(toastId);
  return result;
}

