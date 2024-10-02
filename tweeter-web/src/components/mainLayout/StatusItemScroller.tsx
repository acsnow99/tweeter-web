import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { Status } from "tweeter-shared";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import { StatusItemPresenter, StatusItemView } from "../../presenters/StatusItemPresenter";

interface Props {
    generatePresenter: (view: StatusItemView) => StatusItemPresenter,
}

const StatusItemScroller = (props: Props) => {
    const { generatePresenter } = props;
    const { displayErrorMessage } = useToastListener();
    const [items, setItems] = useState<Status[]>([]);
    const [newItems, setNewItems] = useState<Status[]>([]);
    const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);
  
    const addItems = (newItems: Status[]) =>
      setNewItems(newItems);
  
    const { displayedUser, setDisplayedUser, currentUser, authToken } =
      useContext(UserInfoContext);
  
    // Initialize the component whenever the displayed user changes
    useEffect(() => {
      reset();
    }, [displayedUser]);
  
    // Load initial items whenever the displayed user changes. Done in a separate useEffect hook so the changes from reset will be visible.
    useEffect(() => {
      if(changedDisplayedUser) {
        showMoreItems();
      }
    }, [changedDisplayedUser]);
  
    // Add new items whenever there are new items to add
    useEffect(() => {
      if(newItems) {
        setItems([...items, ...newItems]);
      }
    }, [newItems])
  
    const reset = async () => {
      setItems([]);
      setNewItems([]);
      presenter.reset();
      setChangedDisplayedUser(true);
    }
  
    const showMoreItems = async () => {
      presenter.showMoreItems(authToken!, displayedUser!.alias);
      setChangedDisplayedUser(false);
    };

    const view: StatusItemView = {
      addItems: addItems,
      displayErrorMessage: displayErrorMessage,
    }
    const [presenter] = useState(generatePresenter(view));

    return (
        <div className="container px-0 overflow-visible vh-100">
          <InfiniteScroll
            className="pr-0 mr-0"
            dataLength={items.length}
            next={showMoreItems}
            hasMore={presenter.hasMoreItems}
            loader={<h4>Loading...</h4>}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="row mb-3 mx-0 px-0 border rounded bg-white"
              >
                <StatusItem status={item} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      );
}

export default StatusItemScroller;