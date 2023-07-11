interface DriveSummaryReponse {
  recentDrive: {
    // Thông tin chuyến đi gần nhất
    income: number; // VND
    distance: number; // km
    startTime: number; // epotch
    pickUpTime: number;
    endTime: number;
    driverStartLocation: string;
    toLocation: string;
  };
  totalDriveNum: number; // Tổng số chuyến đi
  averageIncomePerDrive: number; //Số tiền trung bình mỗi chuyến đi
}
