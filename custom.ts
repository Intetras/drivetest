
/**
* このファイルを使って、独自の関数やブロックを定義してください。
* 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
*/

//% weight=30 icon="\uf1b9" color=#000080 block="テストKAGA:bit-Drive"
namespace kagabitdrive {

    export enum direction {
        //% block="前"
        Forward = 1,
        //% block="後"
        Back = 0
    }

    export enum brakeValue {
        //% block="ON"
        On = 1,
        //% block="OFF"
        Off = 0
    }

    let nowPower = [0, 0];
    let nowBrake = brakeValue.Off

    //% group="DCモーター"
    //% blockId=R_DCmotorAnalog
    //% block="モーター制御 Rモーター%powerR"
    //% powerR.min=-1023 powerR.max=1023
    export function RmotorA(powerR: number) {

        if (powerR > 0) {
            pins.digitalWritePin(DigitalPin.P15, direction.Forward);
            pins.analogWritePin(AnalogPin.P16, Math.abs(powerR));
        } else if (powerR < 0) {
            pins.digitalWritePin(DigitalPin.P15, direction.Back);
            pins.analogWritePin(AnalogPin.P16, Math.abs(powerR));
        } else {
            //停止
            if (nowBrake == brakeValue.On) {
                //ブレーキ処理Onの場合
                if (nowPower[1] > 0) {
                    pins.digitalWritePin(DigitalPin.P15, direction.Back);
                    pins.analogWritePin(AnalogPin.P16, Math.abs(nowPower[1]));
                    basic.pause(30);
                } else if (nowPower[1] < 0) {
                    pins.digitalWritePin(DigitalPin.P15, direction.Forward);
                    pins.analogWritePin(AnalogPin.P16, Math.abs(nowPower[1]));
                    basic.pause(30);
                }
            }

            pins.analogWritePin(AnalogPin.P16, 0);

        }
        nowPower[1] = powerR;

    }

    //% group="DCモーター"
    //% blockId=L_DCmotorAnalog
    //% block="モーター制御 Lモーター%powerL"
    //% powerL.min=-1023 powerL.max=1023
    export function LmotorA(powerL: number) {

        if (powerL > 0) {
            pins.digitalWritePin(DigitalPin.P13, direction.Forward);
            pins.analogWritePin(AnalogPin.P14, Math.abs(powerL));
        } else if (powerL < 0) {
            pins.digitalWritePin(DigitalPin.P13, direction.Back);
            pins.analogWritePin(AnalogPin.P14, Math.abs(powerL));
        } else {
            //停止
            if (nowBrake == brakeValue.On) {
                if (nowPower[0] > 0) {
                    pins.digitalWritePin(DigitalPin.P13, direction.Back);
                    pins.analogWritePin(AnalogPin.P14, Math.abs(nowPower[0]));
                    basic.pause(30);
                } else if (nowPower[0] < 0) {
                    pins.digitalWritePin(DigitalPin.P13, direction.Forward);
                    pins.analogWritePin(AnalogPin.P14, Math.abs(nowPower[0]));
                    basic.pause(30);
                }
            }
            pins.analogWritePin(AnalogPin.P14, 0);

        }

        nowPower[0] = powerL;

    }

    //% group="DCモーター"
    //% blockId="Double_DCmotorAnalog"
    //% block="モーター制御 Lモーター %powerL Rモーター %powerR"
    //% powerL.min=-1023 powerL.max=1023
    //% powerR.min=-1023 powerR.max=1023
    export function DoubleMotor(powerL: number, powerR: number) {

        LmotorA(powerL)
        RmotorA(powerR)

    }

    //% group="DCモーター"
    //% blockId="Set_brake"
    //% block="ブレーキ %brake"
    export function setBrake(brake: brakeValue) {
        nowBrake = brake;
        //basic.showNumber(nowBrake)
    }

    //% group="サーボモーター"
    //% blockId=R_Servo_Angle block="Rサーボの角度%angle"
    //% angle.min=0 angle.max=180
    export function RServoAngle(angle: number) {

        pins.servoWritePin(AnalogPin.P9, angle)
    }

    //% group="サーボモーター"
    //% blockId=L_Servo_Angle block="Lサーボの角度%angle"
    //% angle.min=0 angle.max=180
    export function LServoAngle(angle: number) {

        pins.servoWritePin(AnalogPin.P7, angle)
    }

}