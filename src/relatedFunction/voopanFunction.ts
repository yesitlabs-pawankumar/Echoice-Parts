interface ListItem {
  voopan_away_distance?: number;
  // You can add other properties as needed
}
interface MyObject {
  voopons_date: string;
  // other properties of your object
}

export function checkExpirationStatus(givenDate: string): boolean {
  // Split the given date string into year, month, and day
  const [year, month, day] = givenDate.split("-");

  // Convert the given date string to a Date object
  const dateToCheck: Date = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );

  // Get the current date
  const currentDate: Date = new Date();

  // Calculate the difference in milliseconds
  const timeDifference: number = dateToCheck.getTime() - currentDate.getTime();

  // Calculate the difference in days
  const daysDifference: number = timeDifference / (1000 * 3600 * 24);

  if (daysDifference < 0) {
    return false;
  } else if (daysDifference <= 7) {
    return true;
  } else {
    return false;
  }
}

export function filterByVoopanDistance(
  list: ListItem[],
  from: number,
  to: number
): ListItem[] {
  const filteredList = list.filter((item) => {
    const distance = item.voopan_away_distance;
    return distance !== undefined && distance >= from && distance <= to;
  });

  return filteredList;
}

export function filterVoopansByDateRange(
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
    const objDate = new Date(obj.voopons_date);
    return objDate >= startDate && objDate <= endDate;
  });
}
