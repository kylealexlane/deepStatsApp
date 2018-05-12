import React, { Component } from 'react'
import {
    AppRegistry,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ListView,
    SafeAreaView,
    Image,
} from 'react-native'
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts, fontSize } from '../../styles/commonStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import { Grid, LineChart, XAxis, YAxis, Decorator } from 'react-native-svg-charts'

import SVGImage from 'react-native-svg-image'
import { Circle, Path } from 'react-native-svg'


export default class PlayerHistoryGraph extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count: 0
        }
    }

    render() {
        // const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];
        // const labels = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];
        const data = this.props.item.graphData;
        const dataColor = this.props.item.graphDataColor;
        const data2 = this.props.item.graphData2;
        const data2Color = this.props.item.graphData2Color;
        const data3 = this.props.item.graphData3;
        const data3Color = this.props.item.graphData3Color;
        if(data && data.length === 1){
            data.push({value: data[0].value, label: ''});
        };
        if(data2 && data2.length === 1){
            data2.push({value: data2[0].value, label: ''});
        };
        if(data3 && data3.length === 1){
            data3.push({value: data3[0].value, label: ''});
        };

        console.log('playerHistData', data);
        console.log(data2);

        const dataY = this.props.item.dataY;
        console.log('data', data);

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const xAxesSvg = {
            fill: 'black',
            fontSize: 8,
            fontWeight: 'bold',
            rotation: data.length > 6 ? 90 : 0,
            originY: 12,
            y: 0,
        };

        const verticalContentInset = { top: 10, bottom: 10 };
        const xAxisHeight = 30;

        const Decorator = ({ x, y, data }) => {
            console.log(x);
            console.log(y);
            console.log(data);
            return data.map((value, index) => {
                console.log('val', value);
                return(
                <Circle
                    key={index}
                    cx={x(index)}
                    cy={y(value.value)}
                    r={4}
                    stroke={'rgb(134, 65, 244)'}
                    fill={'white'}
                />);
            })
        };


        return (
            <View style={{ height: 200 + xAxisHeight}}>
                <View style={{ height: 200, padding: 10, flexDirection: 'row' }}>
                    <YAxis
                        data={dataY}
                        style={{ marginBottom: 0 }}
                        contentInset={verticalContentInset}
                        // yAccessor={({ item }) => item.value}
                        svg={axesSvg}
                        gridMin={0}
                        gridMax={100}
                        // formatLabel={(_, index) => data[ index ].value}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <LineChart
                            style={ styles.chartContainer}
                            data={data}
                            contentInset={verticalContentInset}
                            yAccessor={({ item }) => item.value}
                            // xAccessor={({ item }) => item.label}
                            svg={{ stroke: dataColor }}
                            gridMin={0}
                            gridMax={100}
                        >
                            <Decorator/>
                            <Grid/>
                        </LineChart>
                        {data2 &&
                        <LineChart
                            style={ styles.chartContainer }
                            data={data2}
                            contentInset={verticalContentInset}
                            yAccessor={({ item }) => item.value}
                            // xAccessor={({ item }) => item.label}
                            svg={{ stroke: data2Color }}
                            gridMin={0}
                            gridMax={100}
                        >
                            <Decorator/>
                        </LineChart>
                        }
                        {data3 &&
                        <LineChart
                            style={ styles.chartContainer }
                            data={data3}
                            contentInset={verticalContentInset}
                            yAccessor={({ item }) => item.value}
                            // xAccessor={({ item }) => item.label}
                            svg={{ stroke: data3Color }}
                            gridMin={0}
                            gridMax={100}
                        >
                            <Decorator/>
                        </LineChart>
                        }
                        <XAxis
                            style={[ styles.xAxis, { bottom: -xAxisHeight, marginHorizontal: -10, height: xAxisHeight }]}
                            data={data}
                            xAccessor={ ({ index }) => index }
                            formatLabel={(_, index) => data[ index ].label}
                            contentInset={{ left: (data.length > 6) ? 15 : 20, right: (data.length > 6) ? 15 : 20 }}
                            svg={xAxesSvg}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seperator: {
        height: '90%',
        backgroundColor: colors.greyLight,
        width: 1
    },
    chartContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0
    },
    xAxis: {
        position: 'absolute',
        right: 0,
        left: -5,
        zIndex: 1000,
    }
});