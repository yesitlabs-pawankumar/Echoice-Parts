interface CategoryItem {
  category_id: number;
  // Add other properties as needed
}

interface ExtendedCategoryItem extends CategoryItem {
  count: number;
}

export const countCategory = (
  list: CategoryItem[] = [],
  ItemList: { category_id: string }[] = [] // Assume category_id in ItemList is a string
): ExtendedCategoryItem[] => {
  let returnList: ExtendedCategoryItem[] = [];

  for (let el of list) {
    let count = 0;

    for (let itemEl of ItemList) {
      if (itemEl.category_id === el.category_id.toString()) {
        // Convert el.category_id to string for comparison
        count += 1;
      }
    }

    returnList.push({ ...el, count: count });
  }

  return returnList.filter((item) => item.count !== 0);
};

interface EventItem {
  category_id: string;
  // Add other properties as needed
}

interface CategoryItem {
  category_id: number;
  // Add other properties as needed
}

export const filterEvent = (
  eventList: EventItem[] = [],
  categoryList: CategoryItem[] = []
): EventItem[] => {
  let returnList: EventItem[] = [];

  for (let elEvent of eventList) {
    for (let elCategory of categoryList) {
      if (elCategory.category_id.toString() === elEvent.category_id) {
        returnList.push(elEvent);
      }
    }
  }

  return returnList;
};

export const convertTo12HourFormat = (time24hr: string): string => {
  const [hours, minutes] = time24hr.split(":").map(Number);

  if (isNaN(hours) || hours < 0 || hours > 23) {
    return "Invalid time format";
  }

  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12; // Convert 0 to 12

  if (!isNaN(minutes) && minutes >= 0 && minutes <= 59) {
    return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )} ${period}`;
  } else {
    return `${String(hours12).padStart(2, "0")}:${String(0).padStart(
      2,
      "0"
    )} ${period}`;
  }
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates: Coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(coordinates);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

export function calculateDistanceInMiles(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const R = 6371; // Radius of the Earth in kilometers

  const lat1 = toRadians(coord1.latitude);
  const lat2 = toRadians(coord2.longitude);
  const deltaLat = toRadians(coord2.latitude - coord1.latitude);
  const deltaLng = toRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceInKm = R * c; // Distance in kilometers
  const distanceInMiles = distanceInKm * 0.621371; // Convert to miles

  return +distanceInMiles.toFixed(2);
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

interface MyObject {
  events_date: string;
  // other properties of your object
}

export function filterObjectsByDateRange(
  date1: string,
  date2: string,
  objectsList: MyObject[]
): MyObject[] {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Ensure that the dates are valid
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date format");
  }

  return objectsList.filter((obj) => {
    const objDate = new Date(obj.events_date);
    return objDate >= startDate && objDate <= endDate;
  });
}

export function isDate1BeforeDate2(date1, date2) {
  const date1Obj = new Date(date1.replace(/-/g, "/"));
  const date2Obj = new Date(date2.replace(/-/g, "/"));

  // Compare the two Date objects
  return date1Obj < date2Obj;
}

export function hasCommonWordIgnorePunctuation(
  str1: string,
  str2: string
): boolean {
  // Check if either statement is empty
  if (str1.trim() === "" || str2.trim() === "") {
    return false;
  }

  // Helper function to remove punctuation from a word
  const removePunctuation = (word: string): string => {
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  };

  // Split the strings into arrays of words and remove punctuation
  const words1: string[] = str1.split(/\s+/).map(removePunctuation);
  const words2: string[] = str2.split(/\s+/).map(removePunctuation);

  // Check for common words
  const commonWords = words1.filter((word) => words2.includes(word));

  // Return true if there are common words, otherwise false
  return commonWords.length > 0;
}

interface ListItem {
  event_away_distance?: number;
  // You can add other properties as needed
}

export function filterByEventDistance(
  list: ListItem[],
  from: number,
  to: number
): ListItem[] {
  const filteredList = list.filter((item) => {
    const distance = item.event_away_distance;
    return distance !== undefined && distance >= from && distance <= to;
  });

  return filteredList;
}
