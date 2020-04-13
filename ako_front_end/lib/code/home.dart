import 'package:flutter/material.dart';



class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
 
  int _selected = 0;

  void onChanged(int value) {
    setState((){
      _selected = value;
    });

    print('Value = $value');
  }

  List<Widget> makeRadios() {
    List<Widget> list = new List<Widget>();



    for(int i = 0; i < 2; i++) {
      
      if ( i < 1) {
        list.add(new RadioListTile(
        value: i,
        title: new Text('Deliverer'),
        groupValue: _selected,
        onChanged: (int value){onChanged(value);},
        activeColor: Colors.teal,
  

      ));
      }else if (i ==1) {
         list.add(new RadioListTile(
        value: i,
        title: new Text('Buyer'),
        groupValue: _selected,
        onChanged: (int value){onChanged(value);},
        activeColor: Colors.teal,
  

      ));
      }
    }

    return list;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home:Scaffold(
      appBar: new AppBar(
        title: new Text('Acount setup'),
        backgroundColor: Colors.teal,
      ),
      
      body: new Container(
        padding: new EdgeInsets.all(32.0),
        child: new Center(
          child:  new Column(
            
            children: makeRadios(),

            
          ),
          
        ),
      ),
    ),
    );
  }
}