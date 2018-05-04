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
import { nbaId, year } from '../../config/commonVariables'
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../../styles/commonStyles'
import { playerPic, hexToRgbA, capitalizeFirstLetter } from "../../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'


import {
    Cell,
    DataTable,
    Header,
    HeaderCell,
    Row,
} from 'react-native-data-table';
import { ListView } from 'realm/react-native';

import StatsTab from './StatsTab';

export default class GeneralShooting extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            data: null,
            dataSource: dataSource,
        };
        this.unfilteredData = null;
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        const data = this.props.database.objects('User');
        this.setState({
            data: data,
            dataSource: this.state.dataSource.cloneWithRows(data),
        });
    }

    onFilterChange(filterString) {
        if (!this.unfilteredData) return;
        let data = null;
        if (filterString === '') { // if filter is emptied, clear filter
            data = this.unfilteredData;
        } else {
            try {
                // using this.unfilteredData, so we don't stack filters
                data = this.unfilteredData.filtered(filterString);
            } catch (err) {
                // ignore error silently
            }
        }

        if (data) {
            this.setState({
                data,
                dataSource: this.state.dataSource.cloneWithRows(data),
            });
        }
    }


    onSearchChange(searchTerm) {
        if (OBJECT_TYPES.indexOf(searchTerm) < 0) return;
        const data = this.props.database.objects(searchTerm);
        this.unfilteredData = data;
        this.setState({
            data: data,
            dataSource: this.state.dataSource.cloneWithRows(data),
        });
    }

    renderHeader() {
        const headerCells = [];
        if (this.state.data && this.state.data.length > 0) {
            const firstObject = this.state.data[0];
            for (const [key] of Object.entries(firstObject)) {
                headerCells.push(
                    <HeaderCell
                        key={key}
                        style={globalStyles.headerCell}
                        textStyle={globalStyles.text}
                        width={1}
                        text={key}
                    />
                );
            }
        }
        return (
            <Header style={globalStyles.header}>
                {headerCells}
            </Header>
        );
    }

    renderRow(item) {
        const cells = [];
        if (this.state.data && this.state.data.length > 0) {
            const firstObject = this.state.data[0];
            for (const [key] of Object.entries(firstObject)) {
                let itemString = item[key]
                    && ((typeof item[key] === 'string')
                        || (typeof item[key] === 'number')
                        || (typeof item[key].getMonth === 'function'))
                    && String(item[key]);
                if (!itemString && item[key] && item[key].length) itemString = item[key].length;
                if (typeof item[key] === 'boolean') itemString = item[key] ? 'True' : 'False';
                if (!itemString && item[key] && item[key].id) itemString = item[key].id;
                cells.push(
                    <Cell
                        key={key}
                        style={globalStyles.cell}
                        textStyle={globalStyles.text}
                        width={1}
                    >
                        {itemString}
                    </Cell>
                );
            }
        }
        return (
            <Row style={globalStyles.row}>
                {cells}
            </Row>
        );
    }

    render() {
        return (
            <View style={[globalStyles.container]}>
                <SearchBar onChange={this.onSearchChange} placeholder="Table Name" />
                <SearchBar onChange={this.onFilterChange} placeholder="Filter" />
                <DataTable
                    style={globalStyles.container}
                    listViewStyle={globalStyles.container}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeader}
                />
            </View>
        );
    }
}
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