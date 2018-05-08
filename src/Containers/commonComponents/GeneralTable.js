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
        this.toggleShowData=this.toggleShowData.bind(this);
        this.state = {
            hideTable: false
        }
    }

    toggleShowData() {
        this.setState({ hideTable: !this.state.hideTable });
    }

    render() {
        let headerRow = this.props.headerRow ? this.props.headerRow : [];
        let rowsData = this.props.rowsData ? this.props.rowsData : [];
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
                console.log(row.slice(1, row.length));
                return row.slice(1, row.length);
            });
        }
        headerRow = headerRow.slice(1, headerRow.length);
        let widthArr = this.props.widthArr ? this.props.widthArr : [];
        const firstColWidth = widthArr.slice(0, 1);
        widthArr = widthArr.slice(1, widthArr.length);

        console.log('error', this.props.errorMessage);

        return (
            <View style={this.props.containerStyle}>
                <View style={[styles.titleContainer, this.props.titleStyle]}>
                    {this.props.showHideIcon &&
                    this.state.hideTable ?
                        <MaterialCommunityIcons
                            name={'chevron-right'}
                            size={20}
                            color={colors.white}
                            style={styles.iconStyle}
                            onPress={this.toggleShowData}
                        />
                        :
                        <MaterialCommunityIcons
                            name={'chevron-down'}
                            size={20}
                            color={colors.white}
                            style={styles.iconStyle}
                            onPress={this.toggleShowData}
                        />
                    }
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
                { !this.state.hideTable && !(this.props.errorMessage.length > 0) &&
                    <View style={styles.tableContainer}>
                        <View style={{ width: firstColWidth[0] ? firstColWidth[0] : 0 }}>
                            <View>
                                <Table borderStyle={{borderColor: this.props.headerStyle.backgroundColor ? this.props.headerStyle.backgroundColor : 'transparent'}}>
                                    <Row
                                        data={firstColumnHeader}
                                        widthArr={firstColWidth}
                                        style={[styles.header, this.props.headerStyle]}
                                        textStyle={[styles.headerText, styles.firstColumnText, appFonts.xsBold]}
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
                                <Table borderStyle={{borderColor: this.props.headerStyle.backgroundColor ? this.props.headerStyle.backgroundColor : 'transparent'}}>
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
                }
                {(this.props.errorMessage.length > 0) &&
                    <Text style={styles.errorText}>{this.props.errorMessage}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    firstColumnText: {
        textAlign: 'left',
        marginLeft: 6,
        ...appFonts.smBold
    },
    iconStyle: {
        marginRight: 6
    },
    titleContainer: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    header: { height: 18, borderLeftWidth: 0 },
    text: { textAlign: 'center', ...appFonts.smRegular, color: colors.mainTextColor },
    headerText: { textAlign: 'center', ...appFonts.xsBold, color: colors.greyLighter },
    dataWrapper: { marginTop: -1 },
    row: { height: 28, backgroundColor: colors.baseBackground, borderBottomColor: colors.black, borderBottomWidth: 0 },
    secondaryRow: {
        backgroundColor: colors.secondaryBackground
    },
    errorText: {
        ...appFonts.mdRegular,
        color: colors.secondaryText,
        paddingVertical: 16,
        textAlign: 'center'
    }
});