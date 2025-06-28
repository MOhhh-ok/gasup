import dayjs from "dayjs";

(global as any).helloWorld = () => {
  console.log('Hello World!');
};

(global as any).today = () => {
  console.log(dayjs().format('YYYY-MM-DD'));
};
