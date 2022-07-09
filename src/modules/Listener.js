import { v4 as uuidv4 } from 'uuid';
import Eventador, {getDefaultOptions} from './Eventador.js';

class Listener {
    constructor(props={}) {
        if (!props.event) {
            throw new Error('eventador: a valid js event must be included as a property');
        }

        if (!props.dispatch) {
            throw new Error('eventador: a dispatch must be included as a property');
        }
        
        this.isListener = true; 
        this.target = props.target       || window;
        this.event = props.event         || undefined;
        this.dispatch = props.dispatch   || undefined;
        this.options = props.options     || getDefaultOptions();
        this.id = props.id               || uuidv4();
        this.calls = props.calls         || 0;
        this.callLog = props.callLog     || [];
        this.callTimes = props.callTimes || [];
    }

    update(e) {
        this.callLog.push(new CallInfo(e, this.calls++));

        if (this.calls === this.options.max) {
            return Eventador.removeListener(this.id);
        } else {
            return false;
        }
    }
}

class CallInfo {
    constructor(e, callNo) {
        this.isCallInfo = true;
        this.time = new Date().getTime();
        this.event = e;
        this.callNo = callNo;
    }
}

export default Listener;