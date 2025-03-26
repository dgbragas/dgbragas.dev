import { baseUrl } from '@/constants/baseUrl.constants';

type DUIPost = {
  category: string;
  description: string;
  images: Array<{
    alternativeText: string;
    caption: string;
    url: string;
  }>;
  title: string;
};

const getDUIPosts = async () => {
  const response = await fetch(`${baseUrl.server}/daily-uis`);
  const json = await response.json();

  const rawData = json.data as DUIPost[];

  return rawData;
};

export { getDUIPosts };
