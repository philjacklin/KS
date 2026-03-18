<script lang="ts">
	import { t } from '$lib/stores/localeStore';
	import Container from '../Container/Container.svelte';
	import Stack from '../stack/Stack.svelte';
	import Typography from '../typography/Typography.svelte';
	import Button from '../button/Button.svelte';
	import Badge from '../badge/Badge.svelte';
	import Alert from '../Alert/Alert.svelte';
	import Card from '../Card/Card.svelte';
	import Avatar from '../Avatar/Avatar.svelte';
	import Breadcrumb from '../Breadcrumb/Breadcrumb.svelte';
	import Checkbox from '../Checkbox/Checkbox.svelte';
	import Divider from '../Divider/Divider.svelte';
	import FormField from '../FormField/FormField.svelte';
	import TextInput from '../TextInput/TextInput.svelte';
	import NumberInput from '../NumberInput/NumberInput.svelte';
	import TextArea from '../TextArea/TextArea.svelte';
	import Select from '../select/Select.svelte';
	import Switch from '../switch/Switch.svelte';
	import RadioGroup from '../RadioGroup/RadioGroup.svelte';
	import Progress from '../progress/Progress.svelte';
	import Spinner from '../spinner/Spinner.svelte';
	import Skeleton from '../Skeleton/Skeleton.svelte';
	import Stat from '../Stat/Stat.svelte';
	import Link from '../Link/Link.svelte';
	import Icon from '../Icon/Icon.svelte';
    import Navbar from '../Navbar/Navbar.svelte';
    import Tabs from '../tabs/Tabs.svelte';
    import Table from '../table/Table.svelte';
    import Pagination from '../pagination/Pagination.svelte';
    import Accordion from '../Accordion/Accordion.svelte';
    import AccordionItem from '../Accordion/AccordionItem.svelte';
    import AccordionHeader from '../Accordion/AccordionHeader.svelte';
    import AccordionContent from '../Accordion/AccordionContent.svelte';
    import DatePicker from '../DatePicker/DatePicker.svelte';
    import FileUpload from '../FileUpload/FileUpload.svelte';
    import Tooltip from '../Tooltip/Tooltip.svelte';
    import Popover from '../Popover/Popover.svelte';
    import Modal from '../Modal/Modal.svelte';
    import Drawer from '../Drawer/Drawer.svelte';
    import ThemeProvider from '../ThemeProvider/ThemeProvider.svelte';
    import ThemeToggleButton from '../ThemeProvider/ThemeToggleButton.svelte';

	const sampleIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" /></svg>';

    const tableColumns = [
        { id: 'name', label: 'Name' },
        { id: 'role', label: 'Role' },
        { id: 'status', label: 'Status' }
    ];

    const tableData = [
        { id: 1, name: 'John Doe', role: 'Developer', status: 'Active' },
        { id: 2, name: 'Jane Smith', role: 'Designer', status: 'On Leave' },
        { id: 3, name: 'Bob Johnson', role: 'Manager', status: 'Active' }
    ];

    const breadcrumbItems = [
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Visual Audit', href: '#' }
    ];

    const selectOptions = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
    ];

    const tabItems = [
        { id: 'tab1', label: 'Tab 1' },
        { id: 'tab2', label: 'Tab 2' },
        { id: 'tab3', label: 'Tab 3' }
    ];

    const radioOptions = [
        { id: 'r1', value: 'r1', label: 'Option A' },
        { id: 'r2', value: 'r2', label: 'Option B' }
    ];

    let showModal = $state(false);
    let showDrawer = $state(false);
</script>

<ThemeProvider>
    <div class="bg-payroll-paper min-h-screen text-payroll-teal transition-colors duration-300">
        <Navbar logo="Design System Audit" />

        <Container className="py-12">
            <Stack spacing="lg">
                <div class="flex justify-between items-start">
                    <div>
                        <Typography variant="h1" as="h1">Visual Audit Page</Typography>
                        <Typography variant="body" color="secondary" className="mt-2">
                            A comprehensive overview of all design system components to ensure visual consistency and alignment.
                        </Typography>
                    </div>
                    <ThemeToggleButton />
                </div>

                <Divider />

                <!-- Typography Section -->
                <section>
                    <Typography variant="h2" as="h2" className="mb-6 border-l-4 border-payroll-gold pl-4">Typography</Typography>
                    <Stack spacing="md" className="bg-white dark:bg-gray-800 p-8 rounded-payroll shadow-payroll border border-payroll-teal/5 transition-colors">
                        <Typography variant="h1">Heading 1 - Approachable Precision</Typography>
                        <Typography variant="h2">Heading 2 - Crisp & Soft</Typography>
                        <Typography variant="h3">Heading 3 - Quiet Design</Typography>
                        <Typography variant="h4">Heading 4 - High legibility</Typography>
                        <Typography variant="body">Body text - This is a standard paragraph. We use Inter or Geist for high legibility, especially for numbers which are critical for NZ payroll. The overall aesthetic is vibrant and uncomplicated. Negative space is prioritized to reduce cognitive load.</Typography>
                        <Typography variant="small">Small text - Used for captions and less important information. Letter spacing -0.01em on headings.</Typography>
                        <Typography variant="body" italic={true}>Italic body text</Typography>
                        <Typography variant="body" color="secondary">Secondary color text</Typography>
                    </Stack>
                </section>

                <Divider />

                <!-- Buttons Section -->
                <section>
                    <Typography variant="h2" as="h2" className="mb-6 border-l-4 border-payroll-gold pl-4">Buttons & Actions</Typography>
                    <div class="flex flex-wrap gap-4 items-end bg-white dark:bg-gray-800 p-8 rounded-payroll shadow-payroll border border-payroll-teal/5 transition-colors">
                        <Button variant="primary">Primary Button</Button>
                        <Button variant="secondary">Secondary Button</Button>
                        <Button variant="outline">Outline Button</Button>
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button size="sm">Small</Button>
                        <Button size="lg">Large</Button>
                        <Button loading={true}>Loading</Button>
                        <Button disabled={true}>Disabled</Button>
                        <div class="w-full mt-4">
                            <Link href="#">Standard Text Link with Underline</Link>
                        </div>
                    </div>
                </section>

                <Divider />

                <!-- Feedback & Indicators -->
                <section>
                    <Typography variant="h2" as="h2" className="mb-6 border-l-4 border-payroll-gold pl-4">Feedback & Indicators</Typography>
                    <Stack spacing="md" className="bg-white dark:bg-gray-800 p-8 rounded-payroll shadow-payroll border border-payroll-teal/5 transition-colors">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Alert type="info" title="Info Alert" message="This is an informational message with the primary brand color." />
                            <Alert type="success" title="Success Alert" message="The operation was successful and compliant." />
                            <Alert type="warning" title="Warning Alert" message="Please review your input for NZ Payroll compliance." />
                            <Alert type="error" title="Error Alert" message="An error occurred while processing the pay run." />
                        </div>
                        
                        <div class="flex flex-wrap gap-4 mt-4">
                            <Badge variant="default">Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                            <Stack spacing="sm">
                                <Typography variant="small">Progress Bar (65%)</Typography>
                                <Progress value={65} max={100} />
                            </Stack>
                            <div class="flex gap-4 items-center">
                                <Spinner size="sm" />
                                <Spinner size="md" />
                                <Spinner size="lg" />
                                <Typography variant="small">Loading states</Typography>
                            </div>
                        </div>

                        <div class="p-4 border border-payroll-teal/10 rounded-payroll bg-payroll-paper/30 dark:bg-gray-700/30">
                            <Typography variant="small" className="mb-2">Skeleton Loading (Soft Depth)</Typography>
                            <div class="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div class="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        </div>
                    </Stack>
                </section>

                <Divider />

                <!-- Form Components -->
                <section>
                    <Typography variant="h2" as="h2" className="mb-6 border-l-4 border-payroll-gold pl-4">Form Components</Typography>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-8 rounded-payroll shadow-payroll border border-payroll-teal/5 transition-colors">
                        <Stack spacing="md">
                            <FormField label="Full Name" helpText="Enter your legal name as per IRD">
                                <TextInput placeholder="e.g. John Doe" />
                            </FormField>
                            
                            <FormField label="Email Address">
                                <TextInput type="email" placeholder="john@example.com" />
                            </FormField>

                            <FormField label="Monthly Salary">
                                <NumberInput value={5000} />
                            </FormField>

                            <FormField label="Notes">
                                <TextArea placeholder="Add any specific notes for this pay run..." />
                            </FormField>

                            <FormField label="Employment Start Date">
                                <DatePicker value={new Date()} />
                            </FormField>
                        </Stack>

                        <Stack spacing="md">
                            <FormField label="Payment Method">
                                <Select options={selectOptions} placeholder="Select an option" />
                            </FormField>

                            <div class="flex flex-col gap-4 p-4 bg-payroll-paper/30 dark:bg-gray-700/30 rounded-payroll border border-payroll-teal/5">
                                <div class="flex items-center gap-2">
                                    <Checkbox id="terms-audit" />
                                    <label for="terms-audit" class="text-sm">Include KiwiSaver contribution</label>
                                </div>

                                <div class="flex items-center gap-4">
                                    <Switch id="notifications-audit" />
                                    <label for="notifications-audit" class="text-sm">Auto-approve pay run</label>
                                </div>

                                <div class="space-y-2">
                                    <Typography variant="small">Tax Category</Typography>
                                    <RadioGroup name="tax-category" options={radioOptions} />
                                </div>
                            </div>

                            <FormField label="Upload Pay Slip (CSV/PDF)">
                                <FileUpload onUpload={() => {}} />
                            </FormField>
                        </Stack>
                    </div>
                </section>

                <Divider />

                <!-- Layout & Containers -->
                <section>
                    <Typography variant="h2" as="h2" className="mb-6 border-l-4 border-payroll-gold pl-4">Layout & Containers</Typography>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card title="Approachability">
                            <Typography variant="body">Organic, soft-edged shapes rather than sharp, industrial corners.</Typography>
                        </Card>
                        <Card title="Soft Depth" className="shadow-payroll">
                            <Typography variant="body">Diffused, low-opacity shadows to lift elements off the page.</Typography>
                        </Card>
                        <Card title="Crisp Layout" onclick={() => {}}>
                            <Typography variant="body">Sharp typography and perfect alignment for financial data.</Typography>
                        </Card>
                    </div>

                    <div class="mb-8">
                        <Accordion>
                            <AccordionItem id="item-1">
                                <AccordionHeader>
                                    {#snippet children()}
                                        Accordion Item 1 - Visual Density
                                    {/snippet}
                                </AccordionHeader>
                                <AccordionContent>
                                    {#snippet children()}
                                        <Typography variant="body">The 8px Grid System ensures consistent spacing and prevents a "busy" feeling.</Typography>
                                    {/snippet}
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem id="item-2">
                                <AccordionHeader>
                                    {#snippet children()}
                                        Accordion Item 2 - Information Hierarchy
                                    {/snippet}
                                </AccordionHeader>
                                <AccordionContent>
                                    {#snippet children()}
                                        <Typography variant="body">Clear hierarchy allows users to focus on critical payroll information.</Typography>
                                    {/snippet}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <div class="mt-8">
                        <Tabs items={tabItems} activeTab="tab1" />
                        <div class="p-8 bg-white dark:bg-gray-800 border border-t-0 border-payroll-teal/10 rounded-b-payroll shadow-payroll transition-colors">
                            <Typography variant="body">Content area with consistent 32px padding as per design philosophy.</Typography>
                        </div>
                    </div>

                    <div class="mt-8">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                </section>

                <Divider />

                <!-- Overlays & Triggers -->
                <section>
                    <Typography variant="h2" as="h2" className="mb-6 border-l-4 border-payroll-gold pl-4">Overlays & Interaction</Typography>
                    <div class="flex flex-wrap gap-4 bg-white dark:bg-gray-800 p-8 rounded-payroll shadow-payroll border border-payroll-teal/5 transition-colors">
                        <Button onclick={() => showModal = true}>Open Modal</Button>
                        <Button variant="secondary" onclick={() => showDrawer = true}>Open Drawer</Button>
                        
                        <Popover>
                            <Button variant="outline">Open Popover</Button>
                            {#snippet content()}
                                <div class="p-4 w-64 bg-white dark:bg-gray-800 rounded-payroll shadow-payroll border border-payroll-teal/10">
                                    <Typography variant="h4">Popover Content</Typography>
                                    <Typography variant="small" className="mt-2">Popovers are used for additional context or small forms.</Typography>
                                </div>
                            {/snippet}
                        </Popover>

                        <Tooltip label="This is a helpful tooltip" placement="top">
                            <Button variant="ghost">Hover for Tooltip</Button>
                        </Tooltip>
                    </div>

                    <Modal bind:isOpen={showModal} titleKey="Visual Audit Modal">
                        <div class="space-y-4 p-6">
                            <Typography variant="body">This modal follows the "Approachable Precision" philosophy with rounded corners and clear typography.</Typography>
                            <div class="flex justify-end mt-6">
                                <Button onclick={() => showModal = false}>Close Modal</Button>
                            </div>
                        </div>
                    </Modal>

                    <Drawer isOpen={showDrawer} onClose={() => showDrawer = false} position="right">
                        <div class="p-8 space-y-4 bg-white dark:bg-gray-800 h-full transition-colors">
                            <Typography variant="h2">Drawer Sidebar</Typography>
                            <Typography variant="body">Drawers provide supplementary actions or navigation without losing context.</Typography>
                            <Button variant="outline" onclick={() => showDrawer = false} className="mt-8">Close Drawer</Button>
                        </div>
                    </Drawer>
                </section>

                <Divider />

                <!-- Data Display -->
                <section>
                    <Typography variant="h2" as="h2" className="mb-6 border-l-4 border-payroll-gold pl-4">Data Display & Visualization</Typography>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <Stat label="Total Gross (NZD)" value="$12,450.80" trend="+5.2%" trendType="increase" />
                        <Stat label="PAYE/Kiwisaver" value="$3,120.45" trend="-1.2%" trendType="decrease" />
                        <Stat label="Net Pay" value="$9,330.35" />
                        <Stat label="Employees Paid" value="24" />
                    </div>

                    <div class="bg-white dark:bg-gray-800 rounded-payroll shadow-payroll border border-payroll-teal/5 overflow-hidden transition-colors">
                        <Table 
                            columns={tableColumns} 
                            data={tableData} 
                            rowSelectionEnabled={true}
                        />
                    </div>
                    
                    <div class="mt-6 flex justify-between items-center">
                        <Typography variant="small" color="secondary">Showing 3 of 24 employees</Typography>
                        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
                    </div>

                    <div class="mt-12 flex items-center justify-between">
                        <div class="flex items-center gap-6">
                            <div class="flex -space-x-3">
                                <Avatar src="https://i.pravatar.cc/150?u=1" alt="User 1" size="md" className="border-2 border-white dark:border-gray-800" />
                                <Avatar src="https://i.pravatar.cc/150?u=2" alt="User 2" size="md" className="border-2 border-white dark:border-gray-800" />
                                <Avatar src="https://i.pravatar.cc/150?u=3" alt="User 3" size="md" className="border-2 border-white dark:border-gray-800" />
                            </div>
                            <Typography variant="small" className="text-payroll-teal/60">Collaborative settings</Typography>
                        </div>
                        <div class="flex items-center gap-6">
                            <Icon svg={sampleIcon} size="24px" className="text-payroll-teal hover:text-payroll-cyan transition-colors" />
                            <Icon svg={sampleIcon} size="24px" className="text-payroll-gold" />
                            <Icon svg={sampleIcon} size="24px" className="text-payroll-cyan" />
                        </div>
                    </div>
                </section>
            </Stack>
        </Container>

        <footer class="bg-payroll-teal text-white py-12 mt-12 border-t border-white/10">
            <Container>
                <div class="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <Typography variant="h4" className="text-white">NZ Payroll Design System</Typography>
                        <Typography variant="small" className="text-white/60 mt-2 block">Lifting the payroll fog with energetic and vibrant design.</Typography>
                    </div>
                    <div class="flex gap-8">
                        <Link href="#" className="text-white/80 hover:text-white">Documentation</Link>
                        <Link href="#" className="text-white/80 hover:text-white">Components</Link>
                        <Link href="#" className="text-white/80 hover:text-white">Themes</Link>
                    </div>
                </div>
                <Divider className="my-8 opacity-20" />
                <Typography variant="small" className="text-white/40">© 2024 NZ Payroll Ltd. Human over technical handling.</Typography>
            </Container>
        </footer>
    </div>
</ThemeProvider>

