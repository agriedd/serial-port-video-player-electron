/*
 * HC-SR04 example sketch
 *
 * https://create.arduino.cc/projecthub/Isaac100/getting-started-with-the-hc-sr04-ultrasonic-sensor-036380
 *
 * by Isaac100
 */

#include <Servo.h>

Servo myservo; // create servo object to control a servo
// twelve servo objects can be created on most boards

int pos = 0; // variable to store the servo position

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int LED_PIN = 0;
const int SERVO_PIN = 8;
const float ACTIVE_DISTANCE = 10.0;
const int DELAY_SR = 1000; // 1 detik
const int DELAY_SERVO = 15;
const int SERVO_DEGREE = 90; // custom max 90 derajat

float duration, distance;

void setup() {
  
  myservo.attach(SERVO_PIN); // attaches the servo on pin 9 to the servo object

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  duration = pulseIn(ECHO_PIN, HIGH);
  distance = (duration*.0343)/2;
  Serial.print("Distance: ");
  Serial.println(distance);
  if(distance <= ACTIVE_DISTANCE){
    if(pos < SERVO_DEGREE){
      for (pos = 0; pos <= SERVO_DEGREE; pos += 1) { // goes from 0 degrees to 90 degrees
        // in steps of 1 degree
        myservo.write(pos); // tell servo to go to position in variable 'pos'
        delay(DELAY_SERVO); // waits 15ms for the servo to reach the position
      }
    }
  } else {
    // digitalWrite(LED_PIN, LOW);
    if(pos > 1){
      for (pos = SERVO_DEGREE; pos >= 0; pos -= 1) { // goes from 0 degrees to 90 degrees
        // in steps of 1 degree
        myservo.write(pos); // tell servo to go to position in variable 'pos'
        delay(DELAY_SERVO); // waits 15ms for the servo to reach the position
      }
    }
  }
  delay(DELAY_SR);
  
}