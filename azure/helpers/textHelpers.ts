const getDateFromImgName = (imgName: string) =>
  Number(imgName?.split("_")?.pop()?.toString().split(".").shift());

const textHelpers = { getDateFromImgName };

export default textHelpers;
