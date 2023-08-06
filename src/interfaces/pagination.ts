type IPaginationOption = {
  page?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
  sortBy?: string;
};

export default IPaginationOption;
