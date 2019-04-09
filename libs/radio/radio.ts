
enum RadioPacketProperty {
    //% blockIdentity=radio._packetProperty
    //% block="signal strength"
    SignalStrength = 2,
    //% blockIdentity=radio._packetProperty
    //% block="time"
    Time = 0,
    //% block="serial number"
    //% blockIdentity=radio._packetProperty
    SerialNumber = 1
}



/**
 * Communicate data using radio packets
 */
//% color=#E3008C weight=96 icon="\uf012"
namespace radio {
    export class Packet {
        /**
         * The number payload if a number was sent in this packet (via ``sendNumber()`` or ``sendValue()``)
         * or 0 if this packet did not contain a number.
         */
        public receivedNumber: number;
        /**
         * The string payload if a string was sent in this packet (via ``sendString()`` or ``sendValue()``)
         * or the empty string if this packet did not contain a string.
         */
        public receivedString: string;
        /**
         * The buffer payload if a buffer was sent in this packet
         * or the empty buffer
         */
        public receivedBuffer: Buffer;
        /**
         * The system time of the sender of the packet at the time the packet was sent.
         */
        public time: number;
        /**
         * The serial number of the sender of the packet or 0 if the sender did not sent their serial number.
         */
        public serial: number;
        /**
         * The received signal strength indicator (RSSI) of the packet.
         */
        public signal: number;
    }

    /**
     * Registers code to run when the radio receives a packet. Also takes the
     * received packet from the radio queue.
     */
    //% help=radio/on-data-packet-received blockHandlerKey="radioreceived" deprecated=true
    //% mutate=objectdestructuring
    //% mutateText=Packet
    //% mutateDefaults="receivedNumber;receivedString:name,receivedNumber:value;receivedString"
    //% blockId=radio_on_packet block="on radio received" blockGap=8
    export function onDataPacketReceived(cb: (packet: Packet) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.receivedNumber = receivedNumber();
            packet.time = receivedTime();
            packet.serial = receivedSerial();
            packet.receivedString = receivedString();
            packet.receivedBuffer = receivedBuffer();
            packet.signal = receivedSignalStrength();
            lastPacket = packet;
            cb(packet)
        });
    }

    /**
     * Registers code to run when the radio receives a number.
     */
    //% help=radio/on-received-number blockHandlerKey="radioreceived"
    //% blockId=radio_on_number_drag block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" draggableParameters=reporter
    export function onReceivedNumber(cb: (receivedNumber: number) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.time = receivedTime();
            packet.serial = receivedSerial();
            packet.signal = receivedSignalStrength();
            packet.receivedNumber = receivedNumber();
            lastPacket = packet;
            cb(packet.receivedNumber);
        });
    }

    /**
     * Registers code to run when the radio receives a key value pair.
     */
    //% help=radio/on-received-value blockHandlerKey="radioreceived"
    //% blockId=radio_on_value_drag block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" draggableParameters=reporter
    export function onReceivedValue(cb: (name: string, value: number) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.time = receivedTime();
            packet.serial = receivedSerial();
            packet.signal = receivedSignalStrength();
            packet.receivedNumber = receivedNumber();
            packet.receivedString = receivedString();
            lastPacket = packet;
            cb(packet.receivedString, packet.receivedNumber)
        });
    }

    /**
     * Registers code to run when the radio receives a string.
     */
    //% help=radio/on-received-string blockHandlerKey="radioreceived"
    //% blockId=radio_on_string_drag block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" draggableParameters=reporter
    export function onReceivedString(cb: (receivedString: string) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.time = receivedTime();
            packet.serial = receivedSerial();
            packet.signal = receivedSignalStrength();
            packet.receivedString = receivedString();
            lastPacket = packet;
            cb(packet.receivedString);
        });
    }

    /**
     * Registers code to run when the radio receives a buffer.
     */
    //% help=radio/on-received-buffer blockHandlerKey="radioreceived" blockHidden=1
    //% blockId=radio_on_buffer_drag block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" draggableParameters=reporter
    export function onReceivedBuffer(cb: (receivedBuffer: Buffer) => void) {
        onDataReceived(() => {
            receiveNumber();
            const packet = new Packet();
            packet.time = receivedTime();
            packet.serial = receivedSerial();
            packet.signal = receivedSignalStrength();
            packet.receivedBuffer = receivedBuffer();
            lastPacket = packet;
            cb(packet.receivedBuffer)
        });
    }

    /**
     * Registers code to run when the radio receives a number. Deprecated, use
     * onReceivedNumber instead.
     */
    //% help=radio/on-received-number blockHandlerKey="radioreceived"
    //% blockId=radio_on_number block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" deprecated=1
    export function onReceivedNumberDeprecated(cb: (receivedNumber: number) => void) {
        onReceivedNumber(cb);
    }

    /**
     * Registers code to run when the radio receives a key value pair. Deprecated, use
     * onReceivedValue instead.
     */
    //% help=radio/on-received-value blockHandlerKey="radioreceived"
    //% blockId=radio_on_value block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" deprecated=1
    export function onReceivedValueDeprecated(cb: (name: string, value: number) => void) {
        onReceivedValue(cb);
    }

    /**
     * Registers code to run when the radio receives a string. Deprecated, use
     * onReceivedString instead.
     */
    //% help=radio/on-received-string blockHandlerKey="radioreceived"
    //% blockId=radio_on_string block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" deprecated=1
    export function onReceivedStringDeprecated(cb: (receivedString: string) => void) {
        onReceivedString(cb);
    }

    /**
     * Registers code to run when the radio receives a buffer. Deprecated, use
     * onReceivedBuffer instead.
     */
    //% help=radio/on-received-buffer blockHandlerKey="radioreceived" blockHidden=1
    //% blockId=radio_on_buffer block="on radio received" blockGap=16
    //% useLoc="radio.onDataPacketReceived" deprecated=1
    export function onReceivedBufferDeprecated(cb: (receivedBuffer: Buffer) => void) {
        onReceivedBuffer(cb);
    }

    let lastPacket: Packet;
    /**
     * Returns properties of the last radio packet received.
     * @param type the type of property to retrieve from the last packet
     */
    //% help=radio/received-packet
    //% weight=11 blockGap=8
    //% blockId=radio_received_packet block="received packet %type=radio_packet_property" blockGap=16
    export function receivedPacket(type: number) {
        if (lastPacket) {
            switch(type) {
                case RadioPacketProperty.Time: return lastPacket.time;
                case RadioPacketProperty.SerialNumber: return lastPacket.serial;
                case RadioPacketProperty.SignalStrength: return lastPacket.signal;
            }
        }
        return 0;
    }

    /**
     * Gets a packet property.
     * @param type the packet property type, eg: PacketProperty.time
     */
    //% blockId=radio_packet_property block="%note"
    //% shim=TD_ID blockHidden=1
    export function _packetProperty(type: RadioPacketProperty): number {
        return type;
    }
}


namespace newradio {
    let transmittingSerial = false;

    const MAX_FIELD_NAME_LENGTH = 12;
    const MAX_FIELD_DOUBLE_NAME_LENGTH = 8;
    const MAX_PAYLOAD_LENGTH = 20;
    const PACKET_PREFIX_LENGTH = 9;
    const VALUE_PACKET_NAME_LEN_OFFSET = 13;
    const DOUBLE_VALUE_PACKET_NAME_LEN_OFFSET = 17;

    // payload: number (9 ... 12)
    const PACKET_TYPE_NUMBER = 0;
    // payload: number (9 ... 12), name length (13), name (14 ... 26)
    const PACKET_TYPE_VALUE = 1;
    // payload: string length (9), string (10 ... 28)
    const PACKET_TYPE_STRING = 2;
    // payload: buffer length (9), buffer (10 ... 28)
    const PACKET_TYPE_BUFFER = 3;
    // payload: number (9 ... 16)
    const PACKET_TYPE_DOUBLE = 4;
    // payload: number (9 ... 16), name length (17), name (18 ... 26)
    const PACKET_TYPE_DOUBLE_VALUE = 5;

    export class RadioPacket {
        public static getPacket(data: Buffer) {
            return new RadioPacket(data);
        }

        public static mkPacket(packetType: number) {
            const res = new RadioPacket();
            res.data[0] = packetType;
            return res;
        }

        private constructor(public readonly data?: Buffer) {
            if (!data) this.data = control.createBuffer(28);
        }

        get packetType() {
            return this.data[0];
        }

        get time() {
            return this.data.getNumber(NumberFormat.Int32LE, 1);
        }

        set time(val: number) {
            this.data.setNumber(NumberFormat.Int32LE, 1, val);
        }

        get serial() {
            return this.data.getNumber(NumberFormat.Int32LE, 5);
        }

        set serial(val: number) {
            this.data.setNumber(NumberFormat.Int32LE, 5, val);
        }

        get stringPayload() {
            const offset = getStringOffset(this.packetType) as number;
            return offset ? this.data.slice(offset + 1, this.data[offset]).toString() : undefined;
        }

        set stringPayload(val: string) {
            const offset = getStringOffset(this.packetType) as number;
            if (offset) {
                const buf = control.createBufferFromUTF8(val);
                const len = Math.min(buf.length, getMaxStringLength(this.packetType));
                this.data[offset] = len;
                this.data.write(offset + 1, buf.slice(0, len));
            }
        }

        get numberPayload() {
            switch (this.packetType) {
                case PACKET_TYPE_NUMBER:
                case PACKET_TYPE_VALUE:
                    return this.data.getNumber(NumberFormat.Int32LE, PACKET_PREFIX_LENGTH);
                case PACKET_TYPE_DOUBLE:
                case PACKET_TYPE_DOUBLE_VALUE:
                    return this.data.getNumber(NumberFormat.Float64LE, PACKET_PREFIX_LENGTH);
            }
            return undefined;
        }

        set numberPayload(val: number) {
            switch (this.packetType) {
                case PACKET_TYPE_NUMBER:
                case PACKET_TYPE_VALUE:
                    this.data.setNumber(NumberFormat.Int32LE, PACKET_PREFIX_LENGTH, val);
                    break;
                case PACKET_TYPE_DOUBLE:
                case PACKET_TYPE_DOUBLE_VALUE:
                    this.data.setNumber(NumberFormat.Float64LE, PACKET_PREFIX_LENGTH, val);
                    break;
            }
        }

        get bufferPayload() {
            const len = this.data[PACKET_PREFIX_LENGTH];
            return this.data.slice(PACKET_PREFIX_LENGTH + 1, len);
        }

        set bufferPayload(b: Buffer) {
            const len = Math.min(b.length, MAX_PAYLOAD_LENGTH - 1);
            this.data[PACKET_PREFIX_LENGTH] = len;
            this.data.write(PACKET_PREFIX_LENGTH + 1, b.slice(0, len));
        }

        hasString() {
            return this.packetType === PACKET_TYPE_STRING ||
                this.packetType === PACKET_TYPE_VALUE ||
                this.packetType === PACKET_TYPE_DOUBLE_VALUE;
        }

        hasNumber() {
            return this.packetType === PACKET_TYPE_NUMBER ||
                this.packetType === PACKET_TYPE_DOUBLE ||
                this.packetType === PACKET_TYPE_VALUE ||
                this.packetType === PACKET_TYPE_DOUBLE_VALUE;
        }
    }


    /**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% help=radio/send-number
    //% weight=60
    //% blockId=radio_datagram_send block="radio send number %value" blockGap=8
    export function sendNumber(value: number) {
        let packet: RadioPacket;

        if (value === (value | 0)) {
            packet = RadioPacket.mkPacket(PACKET_TYPE_NUMBER);
        }
        else {
            packet = RadioPacket.mkPacket(PACKET_TYPE_DOUBLE);
        }

        packet.numberPayload = value;
        sendPacket(packet);
    }

    /**
    * Broadcasts a name / value pair along with the device serial number
    * and running time to any connected micro:bit in the group. The name can
    * include no more than 8 characters.
    * @param name the field name (max 8 characters), eg: "name"
    * @param value the numeric value
    */
    //% help=radio/send-value
    //% weight=59
    //% blockId=radio_datagram_send_value block="radio send|value %name|= %value" blockGap=8
    export function sendValue(name: string, value: number) {
        let packet: RadioPacket;

        if (value === (value | 0)) {
            packet = RadioPacket.mkPacket(PACKET_TYPE_VALUE);
        }
        else {
            packet = RadioPacket.mkPacket(PACKET_TYPE_DOUBLE_VALUE);
        }

        packet.numberPayload = value;
        packet.stringPayload = name;
        sendPacket(packet);
    }

    /**
     * Broadcasts a string along with the device serial number
     * and running time to any connected micro:bit in the group.
     */
    //% help=radio/send-string
    //% weight=58
    //% blockId=radio_datagram_send_string block="radio send string %msg"
    //% msg.shadowOptions.toString=true
    export function sendString(value: string) {
        const packet = RadioPacket.mkPacket(PACKET_TYPE_STRING);
        packet.stringPayload = value;
        sendPacket(packet);
    }

    /**
     * Broadcasts a buffer (up to 19 bytes long) along with the device serial number
     * and running time to any connected micro:bit in the group.
     */
    //% help=radio/send-buffer
    //% weight=57
    //% advanced=true
    export function sendBuffer(msg: Buffer) {
        // TODO
    }

    /**
    * Reads the next packet from the radio queue and and writes it to serial
    * as JSON.
    */
    //% help=radio/write-value-to-serial
    //% weight=3
    //% blockId=radio_write_value_serial block="radio write value to serial"
    //% deprecated=true
    export function writeValueToSerial() {
        const p = RadioPacket.getPacket(radio.takePacket());
        writeToSerial(p);
    }

    /**
    * Writes the last received packet to serial as JSON. This should be called
    * within an ``onDataPacketReceived`` callback.
    */
    //% help=radio/write-received-packet-to-serial
    //% weight=3
    //% blockId=radio_write_packet_serial block="radio write received packet to serial"
    //% advanced=true
    export function writeReceivedPacketToSerial() {
        // TODO
    }

    /**
     * Reads the next packet from the radio queue and returns the packet's number
     * payload or 0 if the packet did not contain a number.
     */
    //% help=radio/receive-number
    //% weight=46
    //% blockId=radio_datagram_receive block="radio receive number" blockGap=8
    //% deprecated=true
    export function receiveNumber() {
        // TODO
    }

    /**
     * Reads the next packet from the radio queue and returns the packet's string
     * payload or the empty string if the packet did not contain a string.
     */
    //% blockId=radio_datagram_receive_string block="radio receive string" blockGap=8
    //% weight=44
    //% help=radio/receive-string
    //% deprecated=true
    export function receiveString() {
        // TODO
    }

    /**
    * Set the radio to transmit the serial number in each message.
    * @param transmit value indicating if the serial number is transmitted, eg: true
    */
    //% help=radio/set-transmit-serial-number
    //% weight=8 blockGap=8
    //% blockId=radio_set_transmit_serial_number block="radio set transmit serial number %transmit"
    //% advanced=true
    export function setTransmitSerialNumber(transmit: boolean) {
        transmittingSerial = transmit;
    }

    /**
     * Returns the number payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or 0 if that packet did not
     * contain a number.
     */
    //% help=radio/received-number
    export function receivedNumber() {
        // TODO
    }

    /**
     * Returns the serial number of the sender micro:bit from the last packet taken
     * from the radio queue (via ``receiveNumber``, ``receiveString``, etc) or 0 if
     * that packet did not send a serial number.
     */
    //% help=radio/received-serial
    export function receivedSerial() {
        // TODO
    }

    /**
     * Returns the string payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or the empty string if that
     * packet did not contain a string.
     */
    //% help=radio/received-string
    export function receivedString() {
        // TODO
    }

    /**
     * Returns the buffer payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or the empty string if that
     * packet did not contain a string.
     */
    //% help=radio/received-buffer
    export function receivedBuffer() {
        // TODO
    }

    /**
     * Returns the system time of the sender micro:bit at the moment when it sent the
     * last packet taken from the radio queue (via ``receiveNumber``,
     * ``receiveString``, etc).
     */
    //% help=radio/received-time
    export function receivedTime() {
        // TODO
    }


    function sendPacket(packet: RadioPacket) {
        packet.time = input.runningTime();
        packet.serial = transmittingSerial ? control.deviceSerialNumber() : 0;
        radio.sendRawPacket(packet.data);
    }

    function writeToSerial(packet: RadioPacket) {
        serial.writeString("{");
        serial.writeString("\"t\":");
        serial.writeString("" + packet.time);
        serial.writeString(",\"s\":");
        serial.writeString("" + packet.serial);

        if (packet.hasString()) {
            serial.writeString(",\"n\":\"");
            serial.writeString(packet.stringPayload);
            serial.writeString("\"");
        }
        if (packet.packetType == PACKET_TYPE_BUFFER) {
            serial.writeString(",\"b\":\"");
            // TODO: proper base64 encoding
            serial.writeString(packet.bufferPayload.toString());
            serial.writeString("\"");
        }
        if (packet.hasNumber()) {
            serial.writeString(",\"v\":");
            serial.writeString("" + packet.numberPayload);
        }

        serial.writeString("}\r\n");
    }

    function getStringOffset(packetType: number) {
        switch (packetType) {
            case PACKET_TYPE_STRING:
                return PACKET_PREFIX_LENGTH;
            case PACKET_TYPE_VALUE:
                return VALUE_PACKET_NAME_LEN_OFFSET;
            case PACKET_TYPE_DOUBLE_VALUE:
                return DOUBLE_VALUE_PACKET_NAME_LEN_OFFSET;
            default:
                return undefined;
        }
    }

    function getMaxStringLength(packetType: number) {
        switch (packetType) {
            case PACKET_TYPE_STRING:
                return MAX_PAYLOAD_LENGTH - 1;
            case PACKET_TYPE_VALUE:
                return MAX_FIELD_NAME_LENGTH;
            case PACKET_TYPE_DOUBLE_VALUE:
                return MAX_FIELD_DOUBLE_NAME_LENGTH;
            default:
                return undefined;
        }
    }

}