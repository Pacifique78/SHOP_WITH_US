import 'dart:ffi';
import 'package:flutter/material.dart';
import 'package:flutter/semantics.dart';
import 'package:flutter_login/flutter_login.dart';
import 'package:splashscreen/splashscreen.dart';
import 'package:ako_front_end/code/login.dart';

void main(){
  runApp(
    MaterialApp(
      darkTheme: ThemeData.dark(),
      debugShowCheckedModeBanner: false,
      home: new MyApp(),
    )
  );
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => new _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    
    return MaterialApp(
      debugShowCheckedModeBanner: false,
        theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        accentColor: Colors.teal,
        cursorColor: Colors.teal,
        
       
      ),
      home:SplashScreen(
        
        seconds: 6,
        navigateAfterSeconds: new Login(),
        title: new Text('Welcome',
        style: new TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 26.0,
          color: Colors.teal,
        ),
        
        ),
        image: Image.asset("assets/images/solo.png"),
        backgroundColor: Colors.white,
        photoSize: 100.0,
      ),
    );
  }


}