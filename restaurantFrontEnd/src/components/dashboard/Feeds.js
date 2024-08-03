import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "New notification(1)",
    icon: "bi bi-bell",
    color: "light",
    date: "3 minute ago",
  },
  {
    title: "New Dish Added",
    icon: "bi bi-menu-up",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Got a new FeedBack",
    icon: "bi bi-layout-text-sidebar-reverse",
    color: "danger",
    date: "50 minute ago",
  },
  {
    title: "New Notification(2)",
    icon: "bi bi-bell",
    color: "success",
    date: "1 hour ago",
  },
  {
    title: "Server Overloaded",
    icon: "bi bi-hdd",
    color: "warning",
    date: "12 hour ago",
  },
  {
    title: "New Blog Added",
    icon: "bi bi-card-text",
    color: "info",
    date: "18 hour ago",
  },
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Updates</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          In Last 24hr
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
