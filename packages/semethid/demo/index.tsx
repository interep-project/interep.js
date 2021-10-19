import {
    Box,
    Button,
    createStyles,
    createTheme,
    Divider,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Paper,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Theme,
    ThemeProvider,
    Typography
} from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import ReplayIcon from "@material-ui/icons/Replay"
import detectEthereumProvider from "@metamask/detect-provider"
import { ethers } from "ethers"
import React from "react"
import ReactDOM from "react-dom"
import semethid from "../src"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        inputPaper: {
            padding: "2px 4px",
            display: "flex",
            alignItems: "center"
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1
        },
        iconButton: {
            padding: 10
        },
        divider: {
            height: 28,
            margin: 4
        },
        results: {
            position: "relative",
            width: 530
        },
        resetButton: {
            zIndex: 1,
            position: "absolute",
            right: 5,
            top: 5
        },
        listItem: {
            paddingTop: 0,
            paddingBottom: 0
        }
    })
)

const theme = createTheme({
    palette: {
        primary: {
            main: "#2e7d32"
        },
        secondary: {
            main: "#827717"
        }
    }
})

function App() {
    const classes = useStyles()
    const [provider, setProvider] = React.useState<any>()
    const [account, setAccount] = React.useState<string>("")
    const [identityCommitment, setIdentityCommitment] = React.useState<any>()
    const [web2Provider, setWeb2Provider] = React.useState<string>("")
    const [activeStep, setActiveStep] = React.useState(0)

    React.useEffect(() => {
        ;(async function IIFE() {
            if (!provider) {
                const newProvider = (await detectEthereumProvider()) as any

                if (newProvider) {
                    setProvider(newProvider)
                } else {
                    console.error("Please install MetaMask!")
                }
            } else {
                const accounts = await provider.request({ method: "eth_accounts" })

                if (accounts.lenght !== 0 && accounts[0]) {
                    setAccount(accounts[0])
                    setActiveStep(1)
                }

                provider.on("accountsChanged", (newAccounts: string[]) => {
                    if (newAccounts.length !== 0) {
                        setAccount(newAccounts[0])
                    } else {
                        setActiveStep(0)
                        setAccount("")
                        setIdentityCommitment("")
                    }
                })
            }
        })()
    }, [provider])

    function handleNext() {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    function resetSteps() {
        setActiveStep(1)
        setIdentityCommitment("")
    }

    async function connect() {
        await provider.request({ method: "eth_requestAccounts" })
        setActiveStep(1)
    }

    async function createIdentityCommitment() {
        const ethersProvider = new ethers.providers.Web3Provider(provider)
        const signer = ethersProvider.getSigner()
        const newIdentityCommitment = await semethid((message: string) => signer.signMessage(message), web2Provider)

        setIdentityCommitment(newIdentityCommitment)
        setActiveStep(3)
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className={classes.container}>
                <Typography variant="h4">Semethid.js</Typography>
                <Typography variant="subtitle1">Semaphore/Ethereum id commitments</Typography>

                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Connect to MetaMask</StepLabel>
                        <StepContent style={{ width: 400 }}>
                            <Button onClick={() => connect()} variant="outlined">
                                Connect
                            </Button>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Enter the Web2 provider</StepLabel>
                        <StepContent style={{ width: 400 }}>
                            <Paper component="form" className={classes.inputPaper}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Twitter"
                                    onChange={(event) => setWeb2Provider(event.target.value)}
                                    value={web2Provider}
                                />
                                <Divider className={classes.divider} orientation="vertical" />
                                <IconButton
                                    onClick={() => handleNext()}
                                    className={classes.iconButton}
                                    disabled={!web2Provider}
                                    color="secondary"
                                >
                                    <CheckIcon />
                                </IconButton>
                            </Paper>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an identity commitment</StepLabel>
                        <StepContent style={{ width: 400 }}>
                            <Button onClick={() => createIdentityCommitment()} variant="outlined">
                                Create Semaphore identity
                            </Button>
                        </StepContent>
                    </Step>
                </Stepper>
                <Paper className={classes.results}>
                    {identityCommitment && (
                        <IconButton onClick={() => resetSteps()} className={classes.resetButton} color="secondary">
                            <ReplayIcon />
                        </IconButton>
                    )}
                    <List>
                        {account && (
                            <ListItem className={classes.listItem}>
                                <ListItemText primary="Selected account" secondary={account} />
                            </ListItem>
                        )}
                        {identityCommitment && (
                            <ListItem className={classes.listItem}>
                                <ListItemText
                                    primary="Identity commitment"
                                    secondary={`${identityCommitment.substr(0, 50)}...`}
                                />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </Box>
        </ThemeProvider>
    )
}

const root = document.getElementById("root")

ReactDOM.render(<App />, root)
