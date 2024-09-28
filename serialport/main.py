import serial
import socket

import json

# Open and read the JSON file
fileconfig = open('config.json', 'r')
data = json.load(fileconfig)

# Print the data

PORT = 12000
SERIALPORT = data['serialport']
BAUDRATE = 9600

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind(('', PORT))

serialPort = serial.Serial(
    port=SERIALPORT, baudrate=BAUDRATE, bytesize=8, timeout=2, stopbits=serial.STOPBITS_ONE
)

serialString = ""  # Used to hold data coming over UART
while True:
    
    message, address = server_socket.recvfrom(1024)
    print(message, address)
    
    while True:
        # Read data out of the buffer until a carraige return / new line is found
        serialString = serialPort.readline()
        try:
            # Print the contents of the serial data
            result = serialString.decode("Ascii")
            print(result)
            server_socket.sendto(str.encode(
                result
                # word
            ), address)
        except:
            print("err")
            break