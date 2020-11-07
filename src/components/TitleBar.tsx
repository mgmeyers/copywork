import React from 'react'
import styled from '@emotion/styled'
import ReactSlider from 'react-slider'
import { BookData } from '../types'
import {
    Button,
    ManualIcon,
    SelectMenu,
    IconButton,
    CogIcon,
    Popover,
    Pane,
    CaretDownIcon,
    Text,
} from 'evergreen-ui'
import {
    Theme,
    useFontFamilyState,
    useFontSizeState,
    useFontWeightState,
    useLineHeightState,
    useLineWidthState,
} from './ThemeProvider'
import { useLocalStorage } from 'react-use'
import { useTheme } from 'emotion-theming'

export const Title = styled.div<{ theme: Theme }>(({ theme }) => ({
    background: theme.getForeground(100),
    borderBottom: `1px solid ${theme.getForeground(95)}`,
    color: theme.getForeground(85),
    left: 0,
    padding: 10,
    position: 'fixed',
    textAlign: 'center',
    top: 0,
    WebkitAppRegion: 'drag',
    width: '100%',
    zIndex: 3,
    display: 'flex',
    justifyContent: 'space-between',
}))

const StyledButton = styled(Button)<{ theme: Theme }>(({ theme }) => ({
    color: theme.getForeground(35) + ' !important',
}))

const StyledBorderButton = styled(Button)<{ theme: Theme }>(({ theme }) => ({
    color: theme.getForeground(35) + ' !important',
    border: `1px solid ${theme.getForeground(90)}`,
}))

const StyledIconButton = styled(IconButton)<{ theme: Theme }>(({ theme }) => ({
    color: theme.getForeground(35) + ' !important',
}))

const SliderWrapper = styled.div<{ theme: Theme }>(({ theme }) => ({
    '.horizontal-slider': {
        height: 14,
        marginBottom: 8,

        '.thumb': {
            width: 14,
            height: 14,
            background: theme.getForeground(40),
            borderRadius: 14,
            cursor: 'pointer',
        },

        '.track': {
            height: 4,
            top: 5,
            background: theme.getForeground(93),
            borderRadius: 3,
        },

        '.active': {
            background: theme.getForeground(20),
            outline: 'none',
        },
    },
}))

const Gutter = styled.div({
    width: 30,
    padding: '0 16px',
})

function getTitle(chapterTitle: string | undefined, chapterIndex: number) {
    return chapterTitle ? chapterTitle : `Section ${chapterIndex + 1}`
}

function ThemeSettings() {
    const theme = useTheme<Theme>()

    const [fontFamily, setFontFamily] = useLocalStorage(
        'fontFamily',
        theme.font.editor.family
    )
    const [fontWeight, setFontWeight] = useLocalStorage(
        'fontWeight',
        theme.font.editor.weight
    )
    const [fontSize, setFontSize] = useLocalStorage(
        'fontSize',
        theme.font.editor.size
    )
    const [lineHeight, setLineHeight] = useLocalStorage(
        'lineHeight',
        theme.font.editor.lineHeight
    )
    const [lineWidth, setLineWidth] = useLocalStorage(
        'lineWidth',
        theme.font.editor.lineWidth
    )

    const [, setFontFamilyState] = useFontFamilyState()
    const [, setFontWeightState] = useFontWeightState()
    const [, setFontSizeState] = useFontSizeState()
    const [, setLineHeightState] = useLineHeightState()
    const [, setLineWidthState] = useLineWidthState()

    const fonts = ['Kreon', 'Lora', 'Roboto Slab', 'Rosario', 'Rubik']

    return (
        <Popover
            shouldCloseOnExternalClick={false}
            content={
                <Pane
                    width={200}
                    padding={12}
                    flexDirection="column"
                >
                    <Pane paddingBottom={4}>
                        <Text
                            fontWeight="bold"
                            display="block"
                            fontSize={12}
                            paddingY={2}
                            paddingRight={12}
                        >
                            Font
                        </Text>
                        <SelectMenu
                            height={160}
                            width={160}
                            closeOnSelect
                            hasFilter={false}
                            hasTitle={false}
                            title="Select font"
                            options={fonts.map((label) => ({
                                label,
                                value: label,
                            }))}
                            selected={fontFamily}
                            onSelect={(item) => {
                                setFontFamily(item.value as string)
                                setFontFamilyState(item.value as string)
                            }}
                        >
                            <StyledBorderButton
                                iconAfter={CaretDownIcon}
                                appearance="minimal"
                                height={24}
                                width="100%"
                                justifyContent="space-between"
                                marginBottom={8}
                            >
                                {fontFamily}
                            </StyledBorderButton>
                        </SelectMenu>

                        <Pane
                            paddingTop={8}
                            paddingBottom={2}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Text
                                fontWeight="bold"
                                display="block"
                                fontSize={12}
                            >
                                Font Weight
                            </Text>
                            <Text display="block" fontSize={12}>
                                {fontWeight}
                            </Text>
                        </Pane>

                        <SliderWrapper>
                            <ReactSlider
                                className="horizontal-slider"
                                defaultValue={fontWeight as number}
                                min={300}
                                max={800}
                                step={1}
                                onChange={(v) => {
                                    setFontWeight(v as number)
                                    setFontWeightState(v as number)
                                }}
                            />
                        </SliderWrapper>

                        <Pane
                            paddingTop={8}
                            paddingBottom={2}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Text
                                fontWeight="bold"
                                display="block"
                                fontSize={12}
                            >
                                Font Size
                            </Text>
                            <Text display="block" fontSize={12}>
                                {fontSize}
                            </Text>
                        </Pane>

                        <SliderWrapper>
                            <ReactSlider
                                className="horizontal-slider"
                                defaultValue={fontSize as number}
                                min={10}
                                max={48}
                                step={1}
                                onChange={(v) => {
                                    setFontSize(v as number)
                                    setFontSizeState(v as number)
                                }}
                            />
                        </SliderWrapper>

                        <Pane
                            paddingTop={8}
                            paddingBottom={2}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Text
                                fontWeight="bold"
                                display="block"
                                fontSize={12}
                            >
                                Line Height
                            </Text>
                            <Text display="block" fontSize={12}>
                                {lineHeight}
                            </Text>
                        </Pane>

                        <SliderWrapper>
                            <ReactSlider
                                className="horizontal-slider"
                                defaultValue={lineHeight as number}
                                min={1}
                                max={2.5}
                                step={0.01}
                                onChange={(v) => {
                                    setLineHeight(v as number)
                                    setLineHeightState(v as number)
                                }}
                            />
                        </SliderWrapper>

                        <Pane
                            paddingTop={8}
                            paddingBottom={2}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Text
                                fontWeight="bold"
                                display="block"
                                fontSize={12}
                            >
                                Line Width
                            </Text>
                            <Text display="block" fontSize={12}>
                                {lineWidth}
                            </Text>
                        </Pane>

                        <SliderWrapper>
                            <ReactSlider
                                className="horizontal-slider"
                                defaultValue={lineWidth as number}
                                min={30}
                                max={100}
                                step={1}
                                onChange={(v) => {
                                    setLineWidth(v as number)
                                    setLineWidthState(v as number)
                                }}
                            />
                        </SliderWrapper>
                    </Pane>
                </Pane>
            }
        >
            <StyledIconButton appearance="minimal" height={24} icon={CogIcon} />
        </Popover>
    )
}

export function TitleBar({
    chapterIndex,
    bookData,
    openBook,
    setChapterIndex,
}: {
    chapterIndex: number
    openBook: (params?: { bookPath?: string }) => void
    bookData: BookData | null
    setChapterIndex: (index: number) => void
}) {
    const bookTitle = bookData?.metadata.title
    const chapterTitle = bookData?.chapters[chapterIndex]?.title
    const chapterId = bookData?.chapters[chapterIndex]?.id

    return (
        <Title>
            <Gutter />
            <Pane flexGrow={1} display="flex">
                <Pane textAlign="right" width="50%">
                    <StyledButton
                        onClick={() => {
                            openBook()
                        }}
                        appearance="minimal"
                        iconBefore={ManualIcon}
                        height={24}
                    >
                        {bookTitle}
                    </StyledButton>
                </Pane>
                <Pane textAlign="left" width="50%">
                    <SelectMenu
                        closeOnSelect
                        title="Select chapter"
                        options={(bookData?.chapters || []).map((ch, i) => ({
                            label: getTitle(ch.title, i),
                            value: ch.id,
                        }))}
                        selected={chapterId}
                        onSelect={(item) =>
                            setChapterIndex(
                                bookData?.chapters.findIndex(
                                    (v) => v.id === item.value
                                ) || 0
                            )
                        }
                    >
                        <StyledButton
                            iconAfter={CaretDownIcon}
                            appearance="minimal"
                            height={24}
                        >
                            {getTitle(chapterTitle, chapterIndex)}
                        </StyledButton>
                    </SelectMenu>
                </Pane>
            </Pane>
            <Gutter>
                <ThemeSettings />
            </Gutter>
        </Title>
    )
}
