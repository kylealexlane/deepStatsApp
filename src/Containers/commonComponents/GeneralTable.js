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
import PropTypes from 'prop-types';
import { List, ListItem, SearchBar, Avatar } from 'react-native-elements'
import { colors, teamColors, windowSize, appFonts } from '../../styles/commonStyles'
import { playerPic, hexToRgbA, capitalizeFirstLetter, swapInArray } from "../../helpers/Helpers"
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'

import { Table, TableWrapper, Row } from 'react-native-table-component';

export default class GeneralTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let headerRow = this.props.headerRow ? this.props.headerRow : [];
        let rowsData = this.props.rowsData ? this.props.rowsData : [];
        // const firstColumn = this.props.rowsData ? this.props.firstColumn : [];
        let firstColumn = [];
        if (rowsData.length > 0) {
            firstColumn = rowsData.map((row) => {
                return row.slice(0, 1);
            });
        }
        const firstColumnHeader = this.props.headerRow? this.props.headerRow.slice(0, 1) : [];

        if (rowsData.length > 0) {
            rowsData = rowsData.map((row, index) => {
                console.log('row', row);
                console.log(row.slice(1, row.length-1));
                return row.slice(1, row.length-1);
            });
        }
        headerRow = headerRow.slice(1, headerRow.length-1);
        let widthArr = this.props.widthArr ? this.props.widthArr : [];
        const firstColWidth = widthArr.slice(0, 1);
        widthArr = widthArr.slice(1, widthArr.length-1);

        console.log('headerRow', headerRow);
        console.log('rowsData', rowsData);
        console.log('firstColumn', firstColumn);
        console.log('firstColumnHeader', firstColumnHeader);



        return (
            <View>
                <View style={[styles.titleContainer, this.props.titleStyle]}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    {/*<MaterialCommunityIcons name={'gesture-swipe-right'} size={20} color={colors.white} style={styles.iconStyle} />*/}
                </View>
                <View style={styles.tableContainer}>
                    <View style={{ width: firstColWidth[0] ? firstColWidth[0] : 0 }}>
                        <View>
                            <Table borderStyle={{borderColor: 'transparent'}}>
                                <Row
                                    data={firstColumnHeader}
                                    widthArr={firstColWidth}
                                    style={[styles.header, this.props.headerStyle]}
                                    textStyle={[styles.headerText, styles.firstColumnText]}
                                />
                            </Table>
                            <Table borderStyle={{borderColor: 'transparent'}}>
                                {
                                    firstColumn.map((tableData, index) => (
                                        <Row
                                            key={index}
                                            data={tableData}
                                            widthArr={firstColWidth}
                                            style={[styles.row, index%2 && styles.secondaryRow]}
                                            textStyle={[styles.text, styles.firstColumnText]}
                                        />
                                    ))
                                }
                            </Table>
                        </View>
                    </View>
                    <ScrollView horizontal={true}>
                        <View>
                            <Table borderStyle={{borderColor: 'transparent'}}>
                                <Row data={headerRow} widthArr={widthArr} style={[styles.header, this.props.headerStyle]} textStyle={styles.headerText}/>
                            </Table>
                            <Table borderStyle={{borderColor: 'transparent'}}>
                                {
                                    rowsData.map((tableData, index) => (
                                        <Row
                                            key={index}
                                            data={tableData}
                                            widthArr={widthArr}
                                            style={[styles.row, index%2 && styles.secondaryRow]}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    firstColumnText: {
        textAlign: 'left',
        marginLeft: 6
    },
    iconStyle: {
        marginRight: 6
    },
    titleContainer: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 6,
        flexDirection: 'row'
        // paddingBottom: 16
    },
    titleText: {
        ...appFonts.lgBold,
        color: colors.white,
        textAlign: 'left',
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    header: { height: 25, borderBottomColor: colors.black, borderBottomWidth: 1 },
    text: { textAlign: 'center', ...appFonts.smRegular, color: colors.white },
    headerText: { textAlign: 'center', ...appFonts.smRegular, color: colors.greyLightest },
    dataWrapper: { marginTop: -1 },
    row: { height: 25, backgroundColor: colors.greyDarkest, borderBottomColor: colors.black, borderBottomWidth: 1 },
    secondaryRow: {
        backgroundColor: colors.greyDarkest
    }
});