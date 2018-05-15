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
        // this.count = 0;
        this.state={
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
            // data.push({value: data[0].value, label: ''});
            data.unshift({value: 0, label: ''});
        }
        if(data2 && data2.length === 1){
            // data2.push({value: data2[0].value, label: ''});
            data2.unshift({value: 0, label: ''});
        }
        if(data3 && data3.length === 1){
            // data3.push({value: data3[0].value, label: ''});
            data3.unshift({value: 0, label: ''});
        }
        const dataY = this.props.item.dataY;
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const xAxesSvg = {
            fill: 'black',
            fontSize: 8,
            fontWeight: 'regular',
            rotation: data.length > 6 ? 90 : 0,
            originY: 12,
            y: 0,
        };

        const verticalContentInset = { top: 10, bottom: 10 };
        const xAxisHeight = 30;

        const Decorator = ({ x, y, data }) => {
            let color = dataColor;
            if (this.count === 1){
                color = data2Color;
            } else if (this.count === 2) {
                color = data3Color;
            }
            // this.count = this.count + 1;
            return data.map((value, index) => {
                return(
                <Circle
                    key={index}
                    cx={x(index)}
                    cy={y(value.value)}
                    r={4}
                    stroke={color}
                    fill={'white'}
                />);
            })
        };


        return (
            <View style={styles.titleWithGraphContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{this.props.item.title}</Text>
                    <View style={styles.numbersTitleRow}>
                        <View style={[styles.subColumnContainer, { borderColor: dataColor }]}>
                            <Text style={styles.headerText}>{this.props.item.headers[0]}</Text>
                            <Text style={styles.statText}>{this.props.item.headersData[0]}</Text>
                        </View>
                        {data2 &&
                        <View style={[styles.subColumnContainer, { borderColor: data2Color }]}>
                            <Text style={styles.headerText}>{this.props.item.headers[1]}</Text>
                            <Text style={styles.statText}>{this.props.item.headersData[1]}</Text>
                        </View>}
                        {data3 &&
                        <View style={[styles.subColumnContainer, { borderColor: data3Color }]}>
                            <Text style={styles.headerText}>{this.props.item.headers[2]}</Text>
                            <Text style={styles.statText}>{this.props.item.headersData[2]}</Text>
                        </View>}
                    </View>
                </View>
                <View style={styles.overallContainer}>
                    <View style={{ height: 200 + xAxisHeight, flex: 1}}>
                        <View style={{ height: 200, paddingBottom: 10, flexDirection: 'row' }}>
                            <YAxis
                                data={dataY}
                                style={{ marginBottom: 0 }}
                                contentInset={verticalContentInset}
                                // yAccessor={({ item }) => item.value}
                                svg={axesSvg}
                                gridMin={this.props.item.dataY[0]}
                                gridMax={this.props.item.dataY[1]}
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
                                    gridMin={this.props.item.dataY[0]}
                                    gridMax={this.props.item.dataY[1]}
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
                                    gridMin={this.props.item.dataY[0]}
                                    gridMax={this.props.item.dataY[1]}
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
                                    gridMin={this.props.item.dataY[0]}
                                    gridMax={this.props.item.dataY[1]}
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
                    {/*<View style={styles.columnContainer}>*/}
                        {/*<View style={[styles.subColumnContainer, { borderColor: dataColor }]}>*/}
                            {/*<Text style={styles.headerText}>{this.props.item.headers[0]}</Text>*/}
                            {/*<Text style={styles.statText}>{this.props.item.headersData[0]}</Text>*/}
                        {/*</View>*/}
                        {/*{data2 &&*/}
                        {/*<View style={[styles.subColumnContainer, { borderColor: data2Color }]}>*/}
                            {/*<Text style={styles.headerText}>{this.props.item.headers[1]}</Text>*/}
                            {/*<Text style={styles.statText}>{this.props.item.headersData[1]}</Text>*/}
                        {/*</View>}*/}
                        {/*{data3 &&*/}
                        {/*<View style={[styles.subColumnContainer, { borderColor: data3Color }]}>*/}
                            {/*<Text style={styles.headerText}>{this.props.item.headers[2]}</Text>*/}
                            {/*<Text style={styles.statText}>{this.props.item.headersData[2]}</Text>*/}
                        {/*</View>}*/}
                    {/*</View>*/}
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
    titleWithGraphContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    xAxis: {
        position: 'absolute',
        right: 0,
        left: -5,
        zIndex: 1000,
    },
    overallContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'nowrap'
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 0,
        alignItems: 'center',
        height: 200
    },
    subColumnContainer: {
        marginVertical: 0,
        alignItems: 'center',
        borderBottomWidth: 1,
        marginLeft: 16
    },
    headerText: {
        ...appFonts.xsRegular,
        color: colors.secondaryText
    },
    statText: {
        ...appFonts.smBold,
        color: colors.baseText
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        width: 5,
        height: 2,
        color: colors.highlight,
    },
    title: {
        ...appFonts.xlBold,
        color: colors.baseText,
        textAlign: 'left',
        // width: '100%',
        // paddingLeft: 8
    },
    titleRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    numbersTitleRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
});