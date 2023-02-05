import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
 
export default function ClubEventCard({item}) {
  return (
    <Card className="grid gap-3 shadow-lg">
      <CardHeader color="blue" className="relative h-56">
        <img
          src="/img/blog.jpg"
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {item?.name}
        </Typography>
        <Typography>
          {item?.description}
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        {/* <Typography variant="small">$899/night</Typography> */}
        <button className="flex items-center justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-base font-medium text-green-600 shadow-sm hover:bg-green-500 hover:text-white">
            Accept
        </button>
        <button className="flex gap-1 items-center justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-base font-medium text-red-600 shadow-sm hover:bg-red-500 hover:text-white">
            Reject
        </button>
        {/* <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Barcelona, Spain
        </Typography> */}
      </CardFooter>
    </Card>
  );
}