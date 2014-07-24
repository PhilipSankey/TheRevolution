/////////////////////////////////////////////////////////////////////////////
// Function : NavNode (constructor)
// Comments :
/////////////////////////////////////////////////////////////////////////////
function NavNode(id, label, href, parent)
{
	this.m_parent = null;
	this.m_level = 0;

	if (parent)
	{
		this.m_parent = parent;
		this.m_level = parent.m_level+1;
	}

	this.m_id = id;

	// assume that m_label will most often be used directly as HTML
	this.m_rawlabel = label;

	label = label.replace(/&/g, '&amp;');
	label = label.replace(/</g, '&lt;');
	label = label.replace(/>/g, '&gt;');
	label = label.replace(/"/g, '&quot;');

	this.m_label = label;

	this.m_href = href;
	this.m_subNodes = new Array();

	var argValues = NavNode.arguments;
	var argCount = NavNode.arguments.length;

	for (i = 4 ; i < argCount ; i++)
	{
		var eqPos = argValues[i].indexOf("==");
		var attrName = argValues[i].substring(0,eqPos);
		var attrValue = argValues[i].substring(eqPos+2);

		eval("this.cp_" + attrName + " = '" + attrValue + "';");
	}

	NavNode.prototype.addNode = addNode;
	NavNode.prototype.isSelected = isSelected;
}

/////////////////////////////////////////////////////////////////////////////
// Function : addNode
// Comments :
/////////////////////////////////////////////////////////////////////////////
function addNode(id, label, href)
{
	var newIndex = this.m_subNodes.length;
	var newNode = new NavNode(id, label, href, this);

	var argValues = addNode.arguments;
	var argCount = addNode.arguments.length;

	for (i = 3 ; i < argCount ; i++)
	{
		var eqPos = argValues[i].indexOf("==");
		var attrName = argValues[i].substring(0,eqPos);
		var attrValue = argValues[i].substring(eqPos+2);

		eval("newNode.cp_" + attrName + " = '" + attrValue + "';");
	}

	this.m_subNodes[newIndex] = newNode;
	return newNode;
}

/////////////////////////////////////////////////////////////////////////////
// Function : isSelected
// Comments :
/////////////////////////////////////////////////////////////////////////////
function isSelected()
{
    var pos = window.location.href.lastIndexOf("/");
    var docname = window.location.href.substring(pos+1, window.location.href.length);

    pos = this.m_href.lastIndexOf("/");
    var myname = this.m_href.substring(pos+1, this.m_href.length);

    if (docname == myname)
		return true;
	else
		return false;
}

/////////////////////////////////////////////////////////////////////////////
// Function : customSectionPropertyExists
// Comments :
/////////////////////////////////////////////////////////////////////////////
function customSectionPropertyExists(csp)
{
	return (typeof csp != _U && csp != null);
}

/////////////////////////////////////////////////////////////////////////////
// Function : getCustomSectionProperty
// Comments :
/////////////////////////////////////////////////////////////////////////////
function getCustomSectionProperty(csp)
{
	if (customSectionPropertyExists(csp))
	{
		return csp;
	}
	else
	{
		return "";
	}
}

/////////////////////////////////////////////////////////////////////////////

var g_navNode_Root = new NavNode('1198','Home',ssUrlPrefix + 'index.htm',null,'TabAssociation==Work Tools','secondaryUrlVariableField==region1');
g_navNode_0=g_navNode_Root.addNode('1210','Systems',ssUrlPrefix + 'Systems/index.htm','secondaryUrlVariableField==region1');
g_navNode_1=g_navNode_Root.addNode('1211','Employee Services',ssUrlPrefix + 'EmployeeServices/index.htm','secondaryUrlVariableField==region1');
g_navNode_2=g_navNode_Root.addNode('1212','Project Tools',ssUrlPrefix + 'ProjectTools/index.htm','secondaryUrlVariableField==region1');
g_navNode_3=g_navNode_Root.addNode('1213','Travel, Expense \x26 Finance',ssUrlPrefix + 'TravelExpenseFinance/index.htm','secondaryUrlVariableField==region1');
g_navNode_4=g_navNode_Root.addNode('1214','Shipping \x26 Mailing',ssUrlPrefix + 'ShippingMailing/index.htm','secondaryUrlVariableField==region1');
g_navNode_6=g_navNode_Root.addNode('1216','Field Support Tools',ssUrlPrefix + 'FieldSupportTools/index.htm','secondaryUrlVariableField==region1');
if (SSContributor)
{
g_navNode_7=g_navNode_Root.addNode('1632','Facilities Tools',ssUrlPrefix + 'FacilitiesMaintenanceOperations/index.htm','contributorOnly==true','secondaryUrlVariableField==region1');
}
g_navNode_8=g_navNode_Root.addNode('1217','Business Forms',ssUrlPrefix + 'BusinessForms/index.htm','secondaryUrlVariableField==region1');
g_navNode_9=g_navNode_Root.addNode('1218','Global Procurement',ssUrlPrefix + 'PurchasingProcurement/index.htm','secondaryUrlVariableField==region1');
g_navNode_10=g_navNode_Root.addNode('1220','Meeting Resources',ssUrlPrefix + 'MeetingResources/index.htm','secondaryUrlVariableField==region1');
g_navNode_11=g_navNode_Root.addNode('1221','Help Me',ssUrlPrefix + 'HelpMe/index.htm','secondaryUrlVariableField==region1');
g_navNode_12=g_navNode_Root.addNode('1590','Reference Center',ssUrlPrefix + 'ReferenceCenter/index.htm','secondaryUrlVariableField==region1');
if (SSContributor)
{
g_navNode_15=g_navNode_Root.addNode('1224','Site Manager',ssUrlPrefix + 'SiteManager/index.htm','contributorOnly==TRUE');
}
g_navNode_16=g_navNode_Root.addNode('2781','Global Services - Service Catalog',ssUrlPrefix + 'GlobalServices-ServiceCatalog/index.htm','Audience==l-eip-all-stateside-uus-cs-cl-gs','secondaryUrlVariableField==region1');
g_navNode_17=g_navNode_Root.addNode('2868','UK Service Catalog',ssUrlPrefix + 'UKServiceCatalog/index.htm','Audience==l-eip-all-uuk','contributorOnly==false','secondaryUrlVariableField==region1');
