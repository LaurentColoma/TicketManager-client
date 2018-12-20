import {Injectable} from "@angular/core";

@Injectable()
export class DataTransferService {

  constructor() {}

  private data;

  _setDataHandler(data) {
    this.data = data;
  }

  _getDataHandler() {
    let tmp = this.data;
    this._clearDataHandler();
    return tmp;
  }

  _clearDataHandler() {
    this.data = undefined;
  }
}
