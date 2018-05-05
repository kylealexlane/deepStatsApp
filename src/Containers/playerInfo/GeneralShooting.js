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
    // ListView,
    SafeAreaView,
    Image,
} from 'react-native'
import { nbaId, year } from '../../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../../styles/commonStyles'
import { playerPic, hexToRgbA, capitalizeFirstLetter, swapInArray } from "../../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'

import { Table, TableWrapper, Row } from 'react-native-table-component';

import StatsTab from './StatsTab';

import GeneralTable from '../commonComponents/GeneralTable'

export default class GeneralShooting extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.playerName : 'Shooting',
            headerStyle: {
                backgroundColor: params.playerTeamShort ? hexToRgbA(teamColors[params.playerTeamShort].primary, 1) : colors.greyDarkest,
                // borderBottomColor: params.playerTeamShort ? teamColors[params.playerTeamShort].secondary : colors.greyDarkest
                borderBottomColor: colors.white

            },
            headerTitleStyle: {
                ...appFonts.lgBold,
                color: colors.white
            },
            // headerTintColor: params.playerTeamShort ? teamColors[params.playerTeamShort].secondary : colors.white,
            headerTintColor: colors.white,

            // headerBackground:  <Image
            //     style={styles.headerBackgroundLogo}
            //     source={{uri: params ? params.teamImageURI : ''}}
            // />,
            headerTransparent: false,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            // tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
            tableHead: ['TYPE', 'GP', 'GAPP', 'FREQ', 'FGM', 'FGA', 'FG%', 'EFG%', '2FREQ', 'FG2M', 'FG2A', 'FG2%', '3FREQ', 'FG3M', 'FG3A', 'FG3%',],
            tableData: [],
            widthArr: [120, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
            year: '2017-18'
        }
    }

    componentWillMount() {
        console.log('id', this.props.navigation.state.params.playerId);
        console.log('teamId', this.props.navigation.state.params.teamId);
        return fetch(`https://stats.nba.com/stats/playerdashptshots/?perMode=PerGame&leagueId=00&season=${this.state.year}&seasonType=Regular+Season&playerId=${this.props.navigation.state.params.playerId}&teamId=${this.props.navigation.state.params.teamId}&outcome=&location=&month=0&seasonSegment=&dateFrom=&dateTo=&opponentTeamId=0&vsConference=&vsDivision=&gameSegment=&period=0&lastNGames=0`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // console.log(responseJson.resultSets[0].rowSet.length-1[4]);
                let data = responseJson.resultSets[1].rowSet;
                let headers = responseJson.resultSets[1].headers;
                headers = swapInArray(swapInArray(headers.slice(3), 0, 2), 1, 2);
                const newData = data.map((dataRow, index) => {
                    console.log('row', dataRow);
                    return swapInArray(swapInArray(dataRow.slice(3), 0, 2), 1, 2);
                });
                console.log('headers', headers);
                this.setState({
                    // tableHead: headers,
                    tableData: newData,
                });
                // this.setState({
                //     // isLoading: false,
                //     // playerBio: responseJson.resultSets[0].rowSet,
                //     playerStats: responseJson.resultSets,
                //     seasonIndex: responseJson.resultSets[0].rowSet.length-1,
                //     currentTeamIndex: responseJson.resultSets[0].rowSet[responseJson.resultSets[0].rowSet.length-1][4] === 'TOT' ? responseJson.resultSets[0].rowSet.length-2 : responseJson.resultSets[0].rowSet.length-1
                // });
            })
            .catch((error) =>{
                console.error(error);
            });

    }

    render() {
        const state = this.state;
        // const tableData = [];
        // for (let i = 0; i < 30; i += 1) {
        //     const rowData = [];
        //     for (let j = 0; j < 9; j += 1) {
        //         rowData.push(`${i}${j}`);
        //     }
        //     tableData.push(rowData);
        // }
        const tableData = state.tableData;
        console.log('tableData', tableData);

        return (
            <View style={styles.container}>
                <GeneralTable
                    title={'Overall Shooting'}
                    headerRow={this.state.tableHead}
                    rowsData={this.state.tableData}
                    widthArr={this.state.widthArr}
                    titleStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  hexToRgbA(teamColors[this.props.navigation.state.params.playerTeamShort].primary, 1) : colors.greyDarkest }}
                    headerStyle={{ backgroundColor: this.props.navigation.state.params.playerTeamShort ?  hexToRgbA(teamColors[this.props.navigation.state.params.playerTeamShort].primary, 0.5) : colors.greyDarkest }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 0, paddingTop: 30, backgroundColor: colors.greyDarkest },
    header: { height: 30, backgroundColor: colors.greyDarkest },
    text: { textAlign: 'center', ...appFonts.smRegular, color: colors.white },
    dataWrapper: { marginTop: -1 },
    row: { height: 20, backgroundColor: colors.greyDarkest },
    secondaryRow: {
        backgroundColor: colors.greyDarkest
    },
    headerBackgroundLogo: {
        width: windowSize.width*2,
        // height: windowSize.width*2,
        opacity: 0.1,
        alignSelf: 'center',
        // position: 'absolute',
        // top: -(windowSize.width)+100
    },
});

//     constructor(props){
//         super(props);
//         this.state ={
//             isLoading: true,
//         }
//     }
//
//     componentDidMount(){
//         console.log('id', this.props.navigation.state.params.playerId);
//         return fetch(`http://stats.nba.com/stats/playerdashptshots/?perMode=PerGame&leagueId=00&season=2015-16&seasonType=Regular+Season&playerId=${this.props.navigation.state.params.playerId}&teamId=1610612745&outcome=&location=&month=0&seasonSegment=&dateFrom=&dateTo=&opponentTeamId=0&vsConference=&vsDivision=&gameSegment=&period=0&lastNGames=0`)
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 console.log(responseJson);
//                 console.log(responseJson.resultSets[0].rowSet.length-1[4]);
//                 this.loadPlayerBio();
//                 this.setState({
//                     isLoading: false,
//                     // playerBio: responseJson.resultSets[0].rowSet,
//                     playerStats: responseJson.resultSets,
//                     seasonIndex: responseJson.resultSets[0].rowSet.length-1,
//                     currentTeamIndex: responseJson.resultSets[0].rowSet[responseJson.resultSets[0].rowSet.length-1][4] === 'TOT' ? responseJson.resultSets[0].rowSet.length-2 : responseJson.resultSets[0].rowSet.length-1
//                 });
//             })
//             .catch((error) =>{
//                 console.error(error);
//             });
//     }
//
//     render() {
//         console.log(this.state);
//         console.log('first', this.state.firstName);
//         console.log(this.state.lastName);
//         return (
//             <SafeAreaView style={{flex:1, backgroundColor: 'black' }}>
//                 <StatusBar
//                     barStyle="light-content"
//                     backgroundColor={colors.greyDarkest}
//                 />
//                 <ScrollView style={styles.container}>
//                     {!this.state.isLoading &&
//                     <View>
//                     </View>
//                     }
//                 </ScrollView>
//             </SafeAreaView>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         backgroundColor: colors.greyDarkest
//     },
//     headerContainer: {
//         width: '100%',
//         height: 200,
//         overflow: 'hidden'
//     },
//     headerBackgroundLogo: {
//         width: windowSize.width*2,
//         height: windowSize.width*2,
//         opacity: 0.1,
//         alignSelf: 'center',
//         position: 'absolute',
//         top: -(windowSize.width)+100
//     },
//     linearGradient: {
//         width: '100%',
//         height: 200,
//         position: 'absolute'
//     },
//     linearGradientDark: {
//         width: '100%',
//         height: 200,
//         position: 'absolute'
//     },
//     mainTextColor: {
//         color: colors.greyLightest,
//     },
//     bioSubTextColor: {
//         color: colors.greyBase
//     },
//     subTextColor: {
//         color: colors.greyLighter,
//     },
//     largeText: {
//         ...appFonts.xxlBold
//     },
//     mediumText: {
//         ...appFonts.xlBold
//     },
//     tabText: {
//         ...appFonts.lgRegular,
//         color: colors.greyLightest
//     },
//     tabTextSelected: {
//         borderBottomWidth: 1,
//         borderBottomColor: colors.highlight
//     },
//     tabContainer: {
//         flex: 0,
//     },
//     statsContainer: {
//         flex: 1,
//         flexDirection: 'column'
//     },
//     bioContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'flex-start'
//     },
//     bioTextLarge: {
//         ...appFonts.lgBold
//     },
//     bioRowContainer: {
//         flex: 1,
//         width: '80%',
//         backgroundColor: 'transparent',
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     bioRowSubContainer: {
//         width: '10%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: 20
//     },
//     bioRowSubContainerWide: {
//         width: '90%',
//         alignItems: 'flex-start',
//         justifyContent: 'center',
//         paddingTop: 20,
//         paddingLeft: 16
//     },
//     bioTextSmaller: {
//         ...appFonts.mdRegular
//     }
// });
//
// AppRegistry.registerComponent(
//     'GeneralShooting',
//     () => GeneralShooting
// );