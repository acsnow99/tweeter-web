import { AuthToken, User } from "tweeter-shared";


export interface UserItemView {
    addItems: (items: User[]) => void;
    displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter {
    reset() {
        this._hasMoreItems = true;
        this._lastItem = null;
    }
    private _view: UserItemView;
    private _hasMoreItems = true;
    private _lastItem: User | null = null;
    
    public constructor(view: UserItemView) {
        this._view = view;
    }

    protected get view() {
        return this._view;
    }

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    protected set hasMoreItems(value: boolean) {
        this._hasMoreItems = value;
    }

    protected get lastItem() {
        return this._lastItem;
    }

    protected set lastItem(value: User | null) {
        this._lastItem = value;
    }

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;
}
